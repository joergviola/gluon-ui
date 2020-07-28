<template>
  <div>
    <el-row :gutter="40">
      <el-col :xs="24" :md="image ? 12 : 24">
        <el-form ref="postForm" :model="item" label-position="left" label-width="120px" :size="size">
          <el-form-item v-for="(field,i) in fields" :key="i" :label="$t('type.'+type+'.'+ field.name)">
            <el-input 
              v-if="field.type=='textarea'" 
              v-model="item[field.name]" 
              type="textarea" 
              :autosize="{minRows:2, maxRows: field.maxRows || 4}"
              :placeholder="field.placeholder" 
              :disabled="readonly"
            />
            <el-select v-else-if="field.type=='select'" v-model="item[field.name]" :disabled="readonly">
              <el-option 
                v-for="(o, i) in field.options" 
                :key="i" 
                :label="field.display ? _.get(o, field.display) : $t('type.'+type+'.'+field.name+'-options.'+o)" 
                :value="field.id ? _.get(o, field.id) : o" 
              />
            </el-select>
            <el-date-picker
              v-else-if="field.type=='date' || field.type=='datetime'"
              v-model="item[field.name]"
              :type="field.type"
              value-format="dateFormat(col.type)"
              :disabled="readonly"
            />
            <gl-date-range
              v-else-if="field.type=='daterange'"
              :from="item[field.name]"
              :to="item[field.to]"
              :disabled="readonly"
              @change="value => {item[field.name] = value.from; item[field.to] = value.to; }"
            />
            <upload
              v-else-if="field.type=='doc'"
              :docs="item[field.docs || 'documents']"
              :path="field.name"
              @docs-added="docs => $emit('docs-added', docs)"
              @docs-removed="docs => $emit('docs-removed', docs)"
            />
            <link-editor 
              v-else-if="field.type=='links'"
              v-model="item[field.name]" 
              :disabled="readonly"
            />

            <el-input v-else-if="field.type=='password'" show-password v-model="item[field.name]" :disabled="readonly"/>
            <el-input v-else type="text" :disabled="field.disabled || readonly" v-model="item[field.name]" >
              <template v-if="field.postfix" slot="append">{{field.postfix}}</template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" >
          <el-col :span="24" class="text-right">
            <el-button v-if="!hideDefaultButtons" type="secondary" @click="$emit('cancel')">
              {{$t('ui.detail.cancel')}}
            </el-button>
            <span v-for="(button, i) in buttons" :key="i" >
            <el-button v-if="!button.show || button.show(item)" type="danger" @click="$emit('click', button)">
              {{ $t('ui.button.'+button.label) }}
            </el-button>
            </span>
            <el-button v-if="!hideDefaultButtons" type="primary" @click="$emit('save')">
              {{$t('ui.detail.save')}}
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-if="image" :xs="24" :md="12">
        <img width="100%" :src="image">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Upload from './gl-upload'
import LinkEditor from './gl-linkEditor'
import GlDateRange from './gl-date-range'
export default {
  name: 'GlEditor',
  components: { Upload, LinkEditor, GlDateRange },
  props: ['type', 'item', 'fields', 'buttons', 'image', 'reload', 'readonly', 'hideDefaultButtons', 'size'],
  methods: {
    dateFormat(type) {
      if (type=='date' || type=='daterange') return 'yyyy-MM-dd'
      else return 'yyyy-MM-dd hh:mm'
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
