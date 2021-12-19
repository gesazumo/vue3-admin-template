<template>
  <va-card>
    <va-card-title>
      {{ $t('dashboard.setupRemoteConnections') }}
    </va-card-title>
    <va-card-content>
      <va-tabs grow v-model="activeTabName">
        <template #tabs>
          <va-tab name="OverviewTab">
            {{$t('dashboard.tabs.overview.title')}}
          </va-tab>
          <va-tab name="BillingAddressTab">
            {{$t('dashboard.tabs.billingAddress.title')}}
          </va-tab>
          <va-tab name="BankDetailsTab">
            {{$t('dashboard.tabs.bankDetails.title')}}
          </va-tab>
        </template>
      </va-tabs>
      <va-separator/>
      <component :is="activeTabName" @submit="submit"/>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import OverviewTab from './dashboard-tabs/OverviewTab.vue'
import BillingAddressTab from './dashboard-tabs/BillingAddressTab.vue'
import BankDetailsTab from './dashboard-tabs/BankDetailsTab.vue'
import { ref } from 'vue';
import {BillingAddressFormType} from '@/interface'

export default {
  name: 'DashboardTabs',
  emits: {
    submit: (data: BillingAddressFormType) => {
      console.log('DashboardTabs submit check')
      return data
    }
  },
  components: {
    OverviewTab,
    BillingAddressTab,
    BankDetailsTab,
  },
  setup(props, {emit}) {
    const activeTabName = ref('BillingAddressTab')

    const submit = (data: BillingAddressFormType) => {
      console.log('DashboardTabs submit start')
      emit('submit', data)
    }

    return {
      activeTabName, submit
    }
  },
}
</script>

<style lang="scss">
.va-tabs__tabs {
  height: 100%;
}
</style>
