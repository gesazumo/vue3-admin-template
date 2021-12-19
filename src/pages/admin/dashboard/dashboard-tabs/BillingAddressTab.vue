<template>
  <div class="pt-2">
    <div class="row">
      <div class="flex sm12 md6">
        <div
          class="title mb-3"
          :style="computedStylesTitle"
        >
          {{$t('dashboard.tabs.billingAddress.personalInfo')}}
        </div>
        <va-input
          :label="$t('dashboard.tabs.billingAddress.firstName')"
          v-model="form.name"
        />
        <va-input
          :label="$t('dashboard.tabs.billingAddress.email')"
          v-model="form.email"
        />
        <va-input
          :label="$t('dashboard.tabs.billingAddress.address')"
          v-model="form.address"
        />
      </div>
      <div class="flex sm12 md6">
        <div
          class="title mb-3"
          :style="computedStylesTitle"
        >
          {{$t('dashboard.tabs.billingAddress.companyInfo')}}
        </div>
        <va-select
          :options="countriesList"
          :label="$t('dashboard.tabs.billingAddress.country')"
          v-model="form.country"
          searchable
        />
        <va-select
          :label="$t('dashboard.tabs.billingAddress.city')"
          v-model="form.city"
          :options="allowedCitiesList"
          key-by="text"
          track-by="text"
        />
        <va-checkbox
          :label="$t('dashboard.tabs.billingAddress.infiniteConnections')"
          v-model="form.connection"
        />
      </div>
    </div>
    <div class="row justify--center">
      <va-button @click="submit">
        {{$t('dashboard.tabs.billingAddress.addConnection')}}
      </va-button>
    </div>
  </div>
</template>

<script lang="ts">
import countriesListData from '@/data/CountriesList'
import { getLineMapData } from '@/data/maps/LineMapData'
import { computed, ref, onMounted, watch } from 'vue';
import {BillingAddressFormType} from '@/interface'
import { useTheme } from '@/composable/useTheme';

const useComputed = () => {
    const {theme} = useTheme()

    const citiesList = computed(()=> {
      return getLineMapData(theme.value).cities.map(({ title, country }) => ({ text: title, country }))
    })

    const countriesList = computed(()=> {
      return countriesListData.filter(item => citiesList.value.filter(({ country }) => country === item).length)
    })

    const computedStylesTitle = computed(()=> {
      return {
        color: theme.value.dark,
      }
    })

    return {
      theme, citiesList, countriesList, computedStylesTitle
    }
}

const useWatch = (form, citiesList, countriesList) => {

  const allowedCitiesList = ref([])

  watch(() => form.value.country, (value) => {
    allowedCitiesList.value = value? citiesList.value.filter(({ country }) => country === value)
      : [...citiesList.value]
  })

  watch(() => form.value.city, ({country}) => {
    form.value.country = countriesList.value.find(item => item === country)
  })

  return {
    allowedCitiesList
  }
}

export default {
  name: 'billing-address-tab',
  emits: {
  submit: (data: BillingAddressFormType) => {
      console.log('billing-address-tab submit check')
      return data
    }
  },
  setup(props, { emit }) {
    const form = ref({
        name: '',
        email: 'smith@gmail.com',
        address: '93  Guild Street',
        city: { text: 'London' },
        country: 'United Kingdom',
        connection: true,
    })

    const {theme, citiesList, countriesList, computedStylesTitle} = useComputed()
    const {allowedCitiesList} = useWatch(form, citiesList, countriesList)

    onMounted(()=> {
      allowedCitiesList.value = [...citiesList.value]
    })

    const submit = () => {
      console.log("billing-address-tab submit start")
      emit('submit', form.value)
    }

    return {
      form, submit,
      theme, citiesList, allowedCitiesList, countriesList, computedStylesTitle
    }
  },
}
</script>

<style lang="scss" scoped>
.va-input-wrapper {
  margin-bottom: 1rem;
}
</style>