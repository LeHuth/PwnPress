<script setup>
    import InputText from 'primevue/inputtext';
    import Dropdown from 'primevue/dropdown';
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';

    import Uploader from './Uploader.vue';

    import { ref } from 'vue';

    const data = ref({
        propability: '',
        pwndoc_json: '',
        excluded: '',
        security: '',
        scanned: '',
        damage: '',
        title: '',
        logo: ''
    });

    const uploads = [
        { title: 'PwnDoc - Json', info: 'Json from PwnDoc', callback: text => data.pwndoc_json = text },
        { title: 'Scanned - Domains', info: 'CSV of scanned domains', callback: text => data.excluded = text }, 
        { title: 'Excluded - Domains', info: 'CSV of excluded domains', callback: text => data.scanned = text },
        { title: 'Security - Projects', info: 'CSV of security prjects', callback: text => data.security = text },
        { title: 'Customer - Logo', info: '.jpg, .jpeg, .png', callback: text => logo = text },
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
</script>

<template>
    <div class='w-screen h-screen flex justify-content-center align-items-center surface-100'>
        <div class='container surface-50 gap-2'>
            <div class='w-full flex align-items-center p-3'>
                <h2 class='font-bold'>Create Report</h2>
            </div>
            <div class='w-full flex justify-content-between align-items-center gap-2 p-3'>
                <InputText v-model='data.title' class='w-full' placeholder='Title*' />
                <Button class='p-button-info p-button-raised w-12rem' label='Create' />
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
            <Uploader v-for='(upload, i) in uploads'
                :key='i'
                @callback='upload.callback'
                :title='upload.title'
                :info='upload.info'
            />
        </div>
    </div>
</template>