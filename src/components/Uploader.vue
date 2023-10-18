<script setup>
    import Button from 'primevue/button';

    import {computed, ref} from 'vue';

    const input_ref = ref(null);
    const name = ref(undefined);
    const isUploaded = ref(false)
    const compute_label = computed(()=>{

    })
</script>

<template>
    <div class="h-3rem border-round-md" >
<!--        <div class='flex align-items-center justify-content-between'>
            <div v-if='name == null' class='flex align-items-center gap-3'>
                <i class='text-500 pi pi-upload' />
                <div>
                    <h4 class='font-semibold'>{{ $attrs.title }}</h4>
                    <p class='font-light text-sm'>{{ $attrs.info }}</p>
                </div>
            </div>&lt;!&ndash;
            <Button
                v-if='name == null'
                class='p-button-info p-button-rounded p-button-raised'
                icon='pi pi-plus'
                @click='input_ref.click()'
            />&ndash;&gt;
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

        </div>-->
      <Button @click="input_ref.click()" :label="isUploaded ? name :$attrs.title" class="p-button-outlined p-button-secondary min-w-full" :icon="'pi ' + (isUploaded ? 'pi-check' : 'pi-upload')" iconPos="right" />

      <input
          type='file'
          :accept="$attrs.file_type"
          class='hidden'
          ref='input_ref'
          @input='event => {
                    $emit("callback", event.target.files[0]);
                    name = event.target.files[0].name;
                    isUploaded = true
                }'
      />
    </div>
</template>

<style scoped>
/*div:hover{
  background-color:#f4f4f5;
}
div:focus{
  background-color: #a15858;
}*/
</style>