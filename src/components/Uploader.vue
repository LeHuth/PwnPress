<script setup>
    import Button from 'primevue/button';

    import { ref } from 'vue';

    const input_ref = ref(null);
</script>

<template>
    <div class='w-full p-3'>
        <div class='flex align-items-center justify-content-between'>
            <div class='flex align-items-center gap-3'>
                <i class='text-500 pi pi-upload' />
                <div>
                    <h4 class='font-semibold'>{{ $attrs.title }}</h4>
                    <p class='font-light text-sm'>{{ $attrs.info }}</p>
                </div>
            </div>
            <Button
                class='p-button-info p-button-rounded p-button-raised'
                icon='pi pi-plus'
                @click='input_ref.click()'
            />
            <input
                type='file'
                class='hidden'
                ref='input_ref'
                @input='event => event.target.files[0].text().then(text => $emit("callback", text))'
            />
        </div>
    </div>
</template>