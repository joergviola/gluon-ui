<template>
  <div>
    <el-select v-if="!onlyCustom" v-model="stdOption" :disabled="disabled" @change="stdChanged">
      <el-option 
        v-for="(o, i) in stdOptions" 
        :key="i" 
        :label="$t('ui.daterange.'+o)" 
        :value="o" 
      />
    </el-select>
    <el-date-picker
      v-if="stdOption=='custom'"
      v-model="customValue"
      type="daterange"
      value-format="yyyy-MM-dd"
      :disabled="disabled"
       @change="customChanged"
    />
  </div>
</template>


<script>

import moment from 'moment'

export default {
  name: 'GlDateRange',
  props: ['from', 'to', 'onlyCustom', 'disabled'],
  data() {
    return {
      stdOption: null,
      stdOptions: [
        'custom',
        'today', 'yesterday', 
        'this-week', 'last-week',
        'this-month', 'last-month',
        'this-year', 'last-year',
      ],
      customValue: [this.from || '', this.to || '']
    }
  },
  methods: {
    getRange(last, lastUnit, unit) {
      return {
        from: moment().subtract(last, lastUnit).startOf(unit),
        to: moment().subtract(last, lastUnit).endOf(unit),
      }
    },
    stdChanged() {
      let range = {};
      switch (this.stdOption) {
        case 'today': range = this.getRange(0, 'days', 'day'); break;
        case 'yesterday': range = this.getRange(1, 'days', 'day'); break;
        case 'this-week': range = this.getRange(0, 'weeks', 'isoWeek'); break;
        case 'last-week': range = this.getRange(1, 'weeks', 'isoWeek'); break;
        case 'this-month': range = this.getRange(0, 'months', 'month'); break;
        case 'last-month': range = this.getRange(1, 'months', 'month'); break;
        case 'this-year': range = this.getRange(0, 'years', 'year'); break;
        case 'last-year': range = this.getRange(1, 'years', 'year'); break;
      }
      this.$emit('change', range)
    },
    customChanged() {
      const value = {
        from: this.customValue[0],
        to: this.customValue[1],
      }
      this.$emit('change', value)
    }
  }
}
</script>