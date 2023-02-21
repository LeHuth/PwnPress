<script setup>
    import InputText from 'primevue/inputtext';
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';

    import Uploader from './Uploader.vue';

    function handle_pwndoc(text) {

    }

    function handle_scanned(text) {

    }

    function handle_excluded(text) {

    }

    const uploads = [
        { title: 'PwnDoc - Json', info: 'Json from PwnDoc', callback: handle_scanned },
        { title: 'Scanned - Domains', info: 'CSV of scanned domains', callback: handle_scanned }, 
        { title: 'Excluded - Domains', info: 'CSV of excluded domains', callback: handle_excluded },
    ]
</script>

<template>
    <div class='w-screen h-screen flex justify-content-center align-items-center surface-100'>
        <div class='container surface-50 gap-2'>
            <div class='w-full flex align-items-center p-3'>
                <h2 class='font-bold'>Create Report</h2>
            </div>
            <div class='w-full flex justify-content-between align-items-center gap-2 p-3'>
                <InputText class='w-full' placeholder='Title*' />
                <Button class='p-button-info p-button-raised w-12rem' label='Create' />
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