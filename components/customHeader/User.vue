<script setup lang="ts">
  import { NDropdown } from 'naive-ui';
  import UserDropdown from '@/components/customHeader/UserDropdown.vue';

  const dropdownOptions = [
    {
      key: 'header',
      type: 'render',
      render: () => h(UserDropdown),
    },
  ];
</script>

<template>
  <ClientOnly>
    <NDropdown
      placement="bottom"
      class="dropdown-select"
      size="medium"
      trigger="click"
      :options="dropdownOptions"
    >
      <SvgoUserPublicAvatar class="svg svg--small" />
    </NDropdown>
  </ClientOnly>
</template>
