<script setup>
    import Button from 'primevue/button';

    import { ref } from 'vue';

    const input_ref = ref(null);
    const name = ref(undefined);
</script>

<template>
    <div class='p-3'>
        <div class='flex align-items-center justify-content-between'>
            <div v-if='name == null' class='flex align-items-center gap-3'>
                <i class='text-500 pi pi-upload' />
                <div>
                    <h4 class='font-semibold'>{{ $attrs.title }}</h4>
                    <p class='font-light text-sm'>{{ $attrs.info }}</p>
                </div>
            </div>
            <Button
                v-if='name == null'
                class='p-button-info p-button-rounded p-button-raised'
                icon='pi pi-plus'
                @click='input_ref.click()'
            />
            <div v-else class='w-full flex justify-content-between align-items-center'>
                <p class='font-semibold'>{{  name  }}</p>
                <Button
                    class='p-button-text p-button-danger p-button-rounded'
                    @click='{
                        name = undefined;
                        input_ref.value = null;
                    }'
                    icon='pi pi-times'
                />
            </div>
            <input
                type='file'
                class='hidden'
                ref='input_ref'
                @input='event => {
                    $emit("callback", event.target.files[0]);

                    name = event.target.files[0].name;
                }'
            />
        </div>
    </div>
</template>