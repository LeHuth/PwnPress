<script setup lang="ts">
import {ref, inject, onMounted, computed} from 'vue';
import Uploader from "~/components/legacy/Uploader.vue";
import RiskMatrix from "~/components/legacy/RiskMatrix.vue";

const { handle_ansi, handle_text, handle_image} = useContentHandlers()
const {parse_csv} = useContentParsers()

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
const progress_count = computed(()=> {
  let amount = 0
  Object.entries(data.value).forEach((entry) =>{
    if(entry[1] != ""){
      amount++
    }
  })
  return (100/8)*amount
})

const form_valid = computed(() => {
  try {
    Object.entries(data.value).forEach((entry) => {
      console.log('scanning...', entry)
      if (entry[1] == "") {
        console.log('exept')
        throw new Error('form invalid')
      }
    })
  } catch (e) {
    console.log('whooops')
    return false
  }
  return true

})

const up = ref(null)

const uploads = [
  {
    title: 'PwnDoc - Json',
    info: 'Json from PwnDoc',
    file_tpe: '.json',
    callback: async file => data.value.pwndoc_json = await handle_text(file)
  },
  {
    title: 'Scanned - Domains',
    info: 'CSV of scanned scopes',
    file_tpe: '.csv',
    callback: async file => data.value.scanned = await handle_ansi(file)
  },
  {
    title: 'Excluded - Domains',
    info: 'CSV of excluded scopes',
    file_tpe: '.csv',
    callback: async file => data.value.excluded = await handle_ansi(file)
  },
  {
    title: 'Security - Projects',
    info: 'CSV of security projects',
    file_tpe: '.csv',
    callback: async file => data.value.security = await handle_ansi(file)
  },
  {
    title: 'Scan - Environment',
    info: '.jpg, .jpeg, .png',
    file_tpe: '.png,.jpeg,.jpg',
    callback: async file => data.value.environment = await handle_image(file)
  },
]

const probabilities = [
  {name: 'Sehr Wahrscheinlich'},
  {name: 'Wahrscheinlich'},
  {name: 'Möglich'},
  {name: 'Unwahrscheinlich'},
  {name: 'Nahezu Unmöglich'},
];

const damages = [
  {name: 'Niedrig'},
  {name: 'Mittel'},
  {name: 'Hoch'},
  {name: 'Sehr Hoch'},
  {name: 'Kritisch'},
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
  <div class='w-full h-full flex justify-content-center align-items-center surface-100'>
    <div class='max-w-7xl w-full mx-auto border-round-lg surface-50 gap-1 lg:px-8'>
      <div>
        <label for="title" class="sr-only bg-yellow-700">Email</label>
        <input
            type="text"
            name="Title"
            id="title"
            class="block bg-transparent w-full text-base font-roboto rounded-2xl border-0 py-1.5 h-8 text-text-100 shadow-sm ring-1 ring-inset ring-text-400 placeholder:text-text-400 focus:ring-2 focus:placeholder:text-accent-400 focus:text-accent-400 focus:ring-inset focus:ring-accent-400"
            placeholder="Report title"
            v-model="data.title"
        />
      </div>
      <TwDivider class="my-8" :gap="'40'" :text="'Risk Matrix'"/>
      <RiskMatrix
          class="mb-8"
          @damage_change="args => data.damage = damages[args]"
          @probability_change="args => data.propability = probabilities[args]"
          :probabilities="probabilities"
          :damages="damages"/>

      <TwDivider class="my-8" :gap="'40'" :text="'Uploads'"/>
      <Uploader class="mb-4" :file_type="uploads[0].file_tpe" :info="uploads[0].info" :title="uploads[0].title"
                @callback="uploads[0].callback"/>
      <div class="gap-4" style="display:grid; grid-template-columns:1fr 1fr;">
      <Uploader v-for='(upload, i) in uploads.slice(1)'
                :key='i'
                :file_type="upload.file_tpe"
                :info='upload.info'
                :title='upload.title'
                @callback='upload.callback'
      />
      </div>
      <TwButton :class="[!form_valid ? 'bg-bg-100 text-bg-200' : 'bg-primary-400' ,'mt-5 w-full']"  @click='handle_create'>Create Report</TwButton>
<!--      <div>
        <InputText v-model='data.title' class='w-full shadow-none' placeholder='Title' required/>
      </div>
      <h2 class='font-bold mt-4' style="padding-top:4px">Risiko Matrix</h2>
      <SelectButton  :options="['Wahrscheinlichkeit', 'Schadensausmass']" disabled class="-mb-2"/>
      <div class='grid mt-0 align-items-center'>
        &lt;!&ndash;                <Dropdown v-model='data.propability' :options='propabilities' optionLabel='name' class='w-full' placeholder='Wahrscheinlichkeit' />
                        <Dropdown v-model='data.damage' :options='damages' optionLabel='name' class='w-full' placeholder='Schadensausmass' />&ndash;&gt;
        <Listbox v-model="data.propability" :options="propabilities" class="col surface-50" option-label="name"
                 option-value="name"/>
        <Divider class="mx-0 align-self-stretch" layout="vertical"/>
        <Listbox v-model='data.damage' :options="damages" class="col surface-50 " option-label="name"
                 option-value="name"/>
      </div>
      <h2 class='font-bold mt-4' style="margin-bottom:12px">Uploads</h2>
      <div>
        <Uploader :file_type="uploads[0].file_tpe" :info="uploads[0].info" :title="uploads[0].title"
                  style="margin-bottom:8px" @callback="uploads[0].callback"/>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem">
          <Uploader v-for='(upload, i) in uploads.slice(1)'
                    :key='i'
                    :file_type="upload.file_tpe"
                    :info='upload.info'
                    :title='upload.title'
                    @callback='upload.callback'
          />
        </div>

      </div>
      <Transition name="bounce">
        <ProgressBar
            v-if="!form_valid"
            class="p-disabled mt-5"
            :value="progress_count"/>
        <Button v-else class="mt-5" label="Create Report" severity="secondary" @click='handle_create'/>
      </Transition>-->
    </div>
  </div>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
:deep(.p-fileupload-file-thumbnail) {
  visibility: hidden;
}

:deep(.p-listbox-list) li {
  text-align: center;
  border-radius: 0.375rem !important;
}

:deep(.p-listbox) {
  border: none;
  box-shadow: none;
  padding-bottom: 0;
}
:deep(.p-selectbutton) {
  box-shadow: none !important;
}
:deep(.p-selectbutton > .p-button) {
  width: 50%;
  border: none;
  background:var(--surface-50);
}
:deep(.p-progressbar){
  height:44px;
}
</style>