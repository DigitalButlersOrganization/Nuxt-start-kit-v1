<script setup lang="ts">
  import { NDropdown } from 'naive-ui';
  import UserDropdown from '@/components/customHeader/UserDropdown.vue';
  import { BUTTON_SIZES, BUTTON_TYPES } from '~/enums';

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
      placement="bottom-end"
      class="dropdown-select"
      size="medium"
      trigger="click"
      :options="dropdownOptions"
    >
      <SharedButton :type="BUTTON_TYPES.BUTTON" :size="BUTTON_SIZES.SMALL">
        <SvgoUserPublicAvatar class="svg svg--small" />
      </SharedButton>
    </NDropdown>
  </ClientOnly>
</template>
