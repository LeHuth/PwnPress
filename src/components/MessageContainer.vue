<script setup>
    import Toast from 'primevue/toast';

    import { useToast } from 'primevue/usetoast';

    import { provide } from 'vue';

    const handle = useToast();

    provide('add_message', msg => handle.add(msg));
</script>

<template>
    <Toast class='w-30rem' />
    <slot />
</template>