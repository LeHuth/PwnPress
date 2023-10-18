<script setup>
    import ProgressSpinner from 'primevue/progressspinner';
    import InputText from 'primevue/inputtext';
    import Dropdown from 'primevue/dropdown';
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';
    
    import Uploader from './Uploader.vue';

    import {ref, inject, onMounted, computed} from 'vue';

    import {
      handle_ansi,
      handle_image,
      handle_text,
      parse_csv
    } from '../utils';

    const loading = ref(false);

    const data = ref({
        propability: '',
        environment: '',
        pwndoc_json: '',
        excluded: '',
        security: '',
        scanned: '',
        damage: '',
        title: '',
    });

    const form_valid = computed(()=>{
      try{
        Object.entries(data.value).forEach((entry)=>{
          console.log('scanning...', entry)
          if(entry[1]==""){
            console.log('exept')
            throw new Error('form invalid')
          }
        })
      } catch (e){
        console.log('whooops')
        return false
      }
      return true

    })

    const up = ref(null)

    const uploads = [
        { title: 'PwnDoc - Json', info: 'Json from PwnDoc',file_tpe:'.json', callback: async file => data.value.pwndoc_json = await handle_text(file) },
        { title: 'Scanned - Domains', info: 'CSV of scanned scopes',file_tpe:'.csv', callback: async file => data.value.scanned = await handle_ansi(file) },
        { title: 'Excluded - Domains', info: 'CSV of excluded scopes',file_tpe:'.csv', callback: async file => data.value.excluded = await handle_ansi(file) },
        { title: 'Security - Projects', info: 'CSV of security projects',file_tpe:'.csv', callback: async file => data.value.security = await handle_ansi(file) },
        { title: 'Scan - Environment', info: '.jpg, .jpeg, .png',file_tpe:'.png,.jpeg,.jpg', callback: async file => data.value.environment = await handle_image(file) },
    ]

    const propabilities = [
        { name: 'Sehr Wahrscheinlich' },
        { name: 'Wahrscheinlich' },
        { name: 'Möglich' },
        { name: 'Unwahrscheinlich' },
        { name: 'Nahezu Unmöglich' },
    ];

    const damages = [
        { name: 'Niedrig' },
        { name: 'Mittel' },
        { name: 'Hoch' },
        { name: 'Sehr Hoch' },
        { name: 'Kritisch' },
    ]

    const add_message = inject('add_message');

    function handle_create() {
        let entity_index = 0;

        const entity_map = {
            'Titel': data.value.title,
            'Wahrscheinlichkeit': data.value.propability.name,
            'Schadensausmass': data.value.damage.name,
            'PwnDoc - Json': data.value.pwndoc_json,
            'Scanned - Domains': data.value.scanned,
            'Excluded - Domains': data.value.excluded,
            'Security - Projects': data.value.security,
            'Scan - Environment': data.value.environment
        };
/*
        Object.keys(entity_map).forEach(key => {
            if (!entity_map[key])
                setTimeout(() => add_message({
                    summary: 'Incorrect input',
                    detail: `${key} not defined`,
                    severity: 'info',
                    life: 3000
                }), entity_index++ * 400);
        });*/

        if (entity_index <= 0) {
            const json = JSON.parse(data.value.pwndoc_json);

            json['excludedDestinations'] = parse_csv(data.value.excluded);
            json['securityProjects'] = parse_csv(data.value.security);
            json['scanDestinations'] = parse_csv(data.value.scanned);

            json['customerScanEnv'] = data.value.environment;
            json['reportTitle'] = data.value.title;

            json['riskMatrix'] = `
                ${data.value.propability.replace(' ', '')}
                ${data.value.damage.replace(' ', '')}
            `.replace(/(\r\n|\n|\r| )/gm, '');

            fetch('http://127.0.0.1:5000/report/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            }).then(response => {
                loading.value = false;

                if (response.status == '200')
                    window.open(response.url)
            });

            loading.value = true;
        }
    }
</script>

<template>
    <div class='w-screen h-screen flex justify-content-center align-items-center surface-100'>
        <div class='container border-round-lg surface-50 gap-1 p-3'>
<!--            <h2 class='font-bold'>Create Report</h2>-->
            <div >
                <InputText v-model='data.title' class='w-full shadow-none' required placeholder='Title' />
<!--                <div>
                    <ProgressSpinner v-if='loading' class='w-4rem'  />
                    <Button v-else class='p-button-info p-button-raised w-12rem' label='Create' @click='handle_create' />
                </div>-->
            </div>
<!--            <div class='w-full px-3'>
                <Divider />
            </div>-->
          <h2 class='font-bold mt-5'>Risiko Matrix</h2>
            <div class='grid mt-0 align-items-center'>
<!--                <Dropdown v-model='data.propability' :options='propabilities' optionLabel='name' class='w-full' placeholder='Wahrscheinlichkeit' />
                <Dropdown v-model='data.damage' :options='damages' optionLabel='name' class='w-full' placeholder='Schadensausmass' />-->
              <ListBox class="col surface-50" v-model="data.propability" option-value="name" :options="propabilities" option-label="name"/>
              <Divider class="mx-0 align-self-stretch" layout="vertical" />
              <ListBox class="col surface-50 " v-model='data.damage' option-value="name" :options="damages" option-label="name"/>
            </div>
            <h2 class='font-bold mt-4' style="margin-bottom:12px">Uploads</h2>
            <div>
              <Uploader style="margin-bottom:8px" @callback="uploads[0].callback" :title="uploads[0].title" :info="uploads[0].info" :file_type="uploads[0].file_tpe"/>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem">
                <Uploader v-for='(upload, i) in uploads.slice(1)'
                          :key='i'
                          @callback='upload.callback'
                          :title='upload.title'
                          :info='upload.info'
                          :file_type="upload.file_tpe"
                />
              </div>

<!--              <FileUpload
                  ref="up"
                  name="destinations"
                  mode="advanced"
                  accept=".json, .csv, .png"
                  file-limit="5"
                  :preview-width="0"
                  :show-upload-button="false"
                  :show-cancel-button="false"
                  multiple
              />-->
            </div>
          <Button class="mt-5" :disabled="!form_valid" label="Create Report" severity="secondary" @click='handle_create' />
        </div>
    </div>
</template>

<style scoped>
:deep(.p-fileupload-file-thumbnail){
  visibility: hidden;
}

:deep(.p-listbox-list) li{
  text-align: center;
  border-radius: 0.375rem !important;
}

:deep(.p-listbox) {
  border:none;
  box-shadow:none;
  padding-bottom: 0;
}
</style>