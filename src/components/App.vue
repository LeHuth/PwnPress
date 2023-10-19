<script setup>
    import ProgressSpinner from 'primevue/progressspinner';
    import InputText from 'primevue/inputtext';
    import Dropdown from 'primevue/dropdown';
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';
    
    import Uploader from './Uploader.vue';

    import { ref, inject } from 'vue';

    import {
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

    const uploads = [
        { title: 'PwnDoc - Json', info: 'Json from PwnDoc', callback: async file => data.value.pwndoc_json = await handle_text(file) },
        { title: 'Scanned - Domains', info: 'CSV of scanned scopes', callback: async file => data.value.scanned = await handle_text(file) }, 
        { title: 'Excluded - Domains', info: 'CSV of excluded scopes', callback: async file => data.value.excluded = await handle_text(file) },
        { title: 'Security - Projects', info: 'CSV of security projects', callback: async file => data.value.security = await handle_text(file) },
        { title: 'Scan - Environment', info: '.jpg, .jpeg, .png', callback: async file => data.value.environment = await handle_image(file) },
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

        Object.keys(entity_map).forEach(key => {
            if (!entity_map[key])
                setTimeout(() => add_message({
                    summary: 'Incorrect input',
                    detail: `${key} not defined`,
                    severity: 'info',
                    life: 3000
                }), entity_index++ * 400);
        });

        if (entity_index <= 0) {
            const json = JSON.parse(data.value.pwndoc_json);

            json['excludedDestinations'] = parse_csv(data.value.excluded);
            json['securityProjects'] = parse_csv(data.value.security);
            json['scanDestinations'] = parse_csv(data.value.scanned);

            json['customerScanEnv'] = data.value.environment;
            json['reportTitle'] = data.value.title;

            json['riskMatrix'] = `
                ${data.value.propability.name.replace(' ', '')}
                ${data.value.damage.name.replace(' ', '')}
            `.replace(/(\r\n|\n|\r| )/gm, '');

            fetch('https://pwntex.zonelocal:5000/report/api/generate', {
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
        <div class='container surface-50 gap-2'>
            <div class='w-full flex align-items-center p-3'>
                <h2 class='font-bold'>Report</h2>
            </div>
            <div class='w-full flex justify-content-between align-items-center gap-2 p-3'>
                <InputText v-model='data.title' class='w-full' placeholder='Title*' />
                <div>
                    <ProgressSpinner v-if='loading' class='w-4rem'  />
                    <Button v-else class='p-button-info p-button-raised w-12rem' label='Create' @click='handle_create' />
                </div>
            </div>
            <div class='w-full px-3'>
                <Divider />
            </div>
            <div class='w-full flex align-items-center p-3'>
                <h2 class='font-bold'>Risiko Matrix</h2>
            </div>
            <div class='w-full flex justify-content-between align-items-center gap-2 p-3'>
                <Dropdown v-model='data.propability' :options='propabilities' optionLabel='name' class='w-full' placeholder='Wahrscheinlichkeit' />
                <Dropdown v-model='data.damage' :options='damages' optionLabel='name' class='w-full' placeholder='Schadensausmass' />
            </div>
            <h2 class='font-bold mx-3'>Uploads</h2>
            <div class='w-full px-3'>
                <Divider />
            </div>
            <div class='relative'>
                <Uploader v-for='(upload, i) in uploads'
                    :key='i'
                    style="width: 100%; float: left;"
                    @callback='upload.callback'
                    :title='upload.title'
                    :info='upload.info'
                />
            </div>
        </div>
    </div>
</template>