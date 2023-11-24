<script setup lang="ts">


    import {computed, ref} from 'vue';

    const input_ref = ref(null)<Element>
    const name = ref(undefined);
    const isUploaded = ref(false)
    const compute_label = computed(()=>{

    })
    const props = defineProps(['title'])
</script>

<template>
    <div class="h-3rem border-round-md" >
<!--      <h1>helloo</h1>
      <button @click="input_ref.click()" :label="isUploaded ? name :$attrs.title" class="p-button-outlined p-button-secondary min-w-full" :icon="'pi ' + (isUploaded ? 'pi-check' : 'pi-upload')" iconPos="right" />
      <TwButton @click="input_ref.click()" class="bg-secondary-400">{{props.title}}</TwButton>-->

        <button @click="input_ref.click()" type="button" class="relative w-full flex justify-center items-center gap-4 rounded-2xl border-2 border-dashed border-text-400 p-3 h-16 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span>
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-text-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </span>
          <span class="text-sm font-semibold text-text-400">Upload {{props.title}}</span>
        </button>

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