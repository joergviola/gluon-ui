<template>
  <div :key="rerender">
    <div class="filter-container">
      <el-col :span="24" type="flex" align="right">
        <slot name="header"></slot>
        <el-button v-if="groupBy" type="default" @click="addGroup()">
            {{$t('ui.list.addGroup')}}
        </el-button>
        <el-button v-if="createBy=='button'" class="filter-item pull-right" style="margin-right: 10px;" type="primary" icon="el-icon-edit" @click="$router.push(detail + '/new/detail')">
          {{$t('ui.list.add')}}
        </el-button>
      </el-col>
    </div>
    <el-table 
      ref="theTable" 
      :data="rows" 
      :span-method="spanMethod"
      row-key="id" 
      border
      @row-click="row => !hasEditable && detailClicked(row)"
      >
      <el-table-column v-if="expandColumns.length>0" type="expand"  width="25">
          <template slot-scope="{row}">
            <editor
              :type="type" 
              :item="row" 
              :fields="expandColumns" 
              :readonly="readonly" 
              @save="save"
            />
          </template>
      </el-table-column>
      <el-table-column v-if="sort" label="" width="25">
        <template slot-scope="{row, $index}">
          <svg class="handle grab" focusable="false" viewBox="0 0 32 32"><path fill="#CCCCCC" d="M14,5.5c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S14,3.8,14,5.5z M21,8.5c1.7,0,3-1.3,3-3s-1.3-3-3-3s-3,1.3-3,3S19.3,8.5,21,8.5z M11,12.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S12.7,12.5,11,12.5z M21,12.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S22.7,12.5,21,12.5z M11,22.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S12.7,22.5,11,22.5z M21,22.5c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S22.7,22.5,21,22.5z"></path></svg>
        </template>
      </el-table-column>
      <el-table-column v-for="(col,i) in stdColumns" :key="i" :label="$t(i18nKey+ col.name)" :prop="col.name" :align="col.align" :minWidth="col.width" sortable :data-column="i">
        <template slot-scope="{row, $index}">
          <el-input
            v-if="!row.$group && editable(row, col) && (!col.type || col.type=='text')"
            class="no-border"
            v-model="row[col.name]"
            :disabled="!editable(row, col) || readonly"
            @change="save(row, col.name)"
            :placeholder="col.placeholder"
            :ref="`field-${$index}-${i}`"
            :data-r="`field-${$index}-${i}`"
            @keydown.enter.native="onEnter(row, i, $index)"
            @keydown.up.native="onArrow(i, $index, -1)"
            @keydown.down.native="onArrow(i, $index, +1)"
            @keydown.delete.native="event=>onDelete(event, row, i, $index)"
          />
          <el-input
            v-if="!row.$group && col.type=='textarea'"
            class="no-border"
            v-model="row[col.name]"
            type="textarea"
            :rows="1" 
            autosize 
            :disabled="!editable(row, col) || readonly"
            @change="save(row, col.name)"
            :placeholder="col.placeholder"
            :ref="`field-${$index}-${i}`"
            :data-r="`field-${$index}-${i}`"
            @keydown.up.native="onArrow(i, $index, -1)"
            @keydown.down.native="onArrow(i, $index, +1)"
            @keydown.delete.native="event=>onDelete(event, row, i, $index)"
          />
          <el-checkbox
            v-if="!row.$group && col.type=='checkbox'"
            class="no-border"
            :value="!!row[col.name]"
            @input="value => row[col.name] = value"
            :disabled="!editable(row, col) || readonly"
            @change="save(row, col.name)"
            :placeholder="col.placeholder"
            :ref="`field-${$index}-${i}`"
            :data-r="`field-${$index}-${i}`"
            @keydown.up.native="onArrow(i, $index, -1)"
            @keydown.down.native="onArrow(i, $index, +1)"
            @keydown.delete.native="event=>onDelete(event, row, i, $index)"
          />
          <span 
            v-if="!row.$group && !editable(row, col) && !col.type" 
            class="input-disabled"
          >
            {{typeof col.name === 'string' ? _.get(row, col.name) : col.name(row) }}
          </span>
          <el-select v-if="!row.$group && col.type=='select'" class="no-border" v-model="row[col.name]" @change="save(row, col.name)" :disabled="!editable(row, col) || readonly" :placeholder="col.placeholder">
            <el-option 
              v-for="(o, i) in col.options" 
              :key="i" 
              :label="col.display ? _.get(o, col.display) : $t('type.'+type+'.'+col.name+'-options.'+o)" 
              :value="col.id ? _.get(o, col.id) : o" 
            />
          </el-select>
          <el-date-picker
            :placeholder="col.placeholder"
            class="no-border"
            v-if="!row.$group && (col.type=='date' || col.type=='datetime')"
            v-model="row[col.name]"
            :type="col.type"
            :disabled="!editable(row, col) || readonly"
            :format="dateFormat(col.type)"
            :value-format="dateFormat(col.type)"
            @change="save(row, col.name)"
          />
          <progress-bar
            v-if="!row.$group && col.type=='progress'"
            :used="row[col.name]"
            :planned="row[col.budget]"
          />
          <h4 v-if="row.$group && i==0">
            <i v-if="!hidden[row.value]" class="el-icon-caret-bottom"  @click="show(row.value, false)"/>
            <i v-if="hidden[row.value]" class="el-icon-caret-right"  @click="show(row.value, true)"/>
            <el-input v-if="!groupBy.type || groupBy.type=='text'" class="no-border heading" v-model="row.value" @change="changeGroup(row)" />
            <el-select v-if="groupBy.type=='select'" class="no-border" v-model="row.value" @change="changeGroup(row)">
              <el-option 
                v-for="(o, i) in groupBy.options" 
                :key="i" 
                :label="groupBy.display ? _.get(o, groupBy.display) : $t('type.'+type+'.'+groupBy.field+'-options.'+o)" 
                :value="groupBy.id ? _.get(o, groupBy.id) : o" 
              />
            </el-select>
            <span class="pull-right" v-for="(reduced, i) in row.reduced" :key="i">{{$t(i18nKey+ reduced.name)}}: {{reduced.value}}</span>
          </h4>
        </template>
      </el-table-column>

      <el-table-column align="right" :label="$t('ui.list.actions')" >
        <template slot-scope="{row}">
          <i v-if="!row.$group && allowDelete" class="action el-icon-remove-outline" @click="remove(row)" :title="$t('ui.list.delete')"/> 
          <i v-if="!row.$group && detail" class="action el-icon-arrow-right" @click="detailClicked(row)"  :title="$t('ui.list.edit')"/> 
        </template>
      </el-table-column>
    </el-table>

    <el-button v-if="showAddButton" class="filter-item pull-right" style="margin-right: 10px;" type="default" icon="el-icon-circle-plus-outline" @click="addNew()">
      {{$t('ui.list.add')}}
    </el-button>

  </div>
</template>

<script>
import ProgressBar from './gl-progress'
import Editor from './gl-editor'
import Sortable from 'sortablejs'

export default {
  name: 'gl-table',
  components: {ProgressBar, Editor},
  props: ['type', 'list', 'i18nKey', 'detail', 'columns', 'template', 'createBy', 'allowDelete', 'sort', 'groupBy','readonly'],
  data() {
    return {
      hidden: {},
      draggingGroup: false,
      rerender: 0
    }
  },
  watch: {
    groupBy() {
      this.hidden = {}
    }
  },
  mounted() {
    this.setSort()
  },
  computed: {
    rows() {
      if (!this.groupBy) return this.list;

      const self = this

      if (this.list.length==0) {
        return [
          {$group: true, value: current, reduced: []},
          Object.assign({}, this.template)
        ]
      }

      if (!this.sort) {
        this.list.sort((a, b) => {
          const aa = group(a)
          const bb = group(b)
          if (aa < bb) return -1
          else if (aa > bb) return +1
          else return 0
        })
      }

      let first = this.list[0]
      let current = group(first)
      const result = [{$group: true, value: current, reduced: []}]

      this.list.forEach((item,i) => {
        if (group(item) != current) {
          current = group(item)
          result.push({$group: true, value: current, reduced: []})
        }
        if (!this.draggingGroup && !this.hidden[current]) {
          result.push(item)
        }
      })

      if (this.groupBy.reduce) {
        result
          .filter(item => item.$group)
          .forEach(row => {
            const items = result.filter(item => !item.$group && group(item)==row.value)
            this.groupBy.reduce.forEach(reduce => {
              row.reduced.push({
                name: reduce.name,
                value: items.reduce((sum, item) => sum+item[reduce.name], 0)
              })
            })
          })
      }

      return result;


      function group(item) {
        return item[self.groupBy.field] || 'None'
      }
    },
    showAddButton() {
      if (this.createBy=='button' || this.groupBy) return false
      return true
    },
    hasEditable() {
      return this.columns.some(c => c.editable)
    },

    stdColumns() {
      return this.columns.filter(c => !c.expand)
    },
    expandColumns() {
      return this.columns.filter(c => c.expand)
    }
  },
  methods: {
    editable(row, col) {
      if (this.readonly) return false
      if (typeof col.editable == 'function') return col.editable(row)
      else return col.editable
    },
    detailClicked(row) {
      if (typeof this.detail == 'string') {
        this.$router.push(`${this.detail}/${row.id}/detail`)
      } else {
        this.detail(row)
      }
    },
    show(value, show) {
      this.hidden = Object.assign({}, this.hidden)
      this.hidden[value] = !show
    },
    dateFormat(type) {
      if (type=='date') return 'yyyy-MM-dd'
      else return 'yyyy-MM-dd hh:mm'
    },
    create(pos = null) {
      if (this.createBy == 'row' || this.createBy==null) {
        const item = Object.assign({}, this.template)
        // item.id = null // make it reactive
        // item._meta = this.meta
        if (this.sort) {
          item[this.sort] = this.list.length+1
        }
        // if (this.groupBy) {
        //   item[this.groupBy.field] = this.lists[groupIndex].group
        // }
        if (pos==null) {
          this.list.push(item)
        } else {
          this.list.splice(pos, 0, item)
        }
        return item
      }
      return null
    },
    save(row, attr) {
      this.$emit('change', row, attr)
    },
    addGroup() {
      this.onEnter(null, 0, -1)
    },
    addNew() {
      this.onEnter(null, 0, this.list.length-1)
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.$group && columnIndex==1) return [1, this.columns.length]
      else return [1, 1]
    },
    changeGroup(row) {
      let i = this.rows.indexOf(row)
      const rows = []
      while (i < this.rows.length-1 && !this.rows[++i].$group) {
        this.rows[i][this.groupBy.field] = row.value
        rows.push(this.rows[i])
      }
      const index = this.list.indexOf(rows[0])
      this.$emit('sort', rows, index, index)
    },
    setSort() {
      const el = this.$refs.theTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      const self = this
      return Sortable.create(el, {
        handle: ".handle",
        group: "group",
        ghostClass: 'sortable-ghost',
        setData: function (dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onStart: evt => {
          const row = this.rows[evt.oldIndex]
          if (row.$group) {
            this.draggingGroup = true
          }
        },
        onEnd: async (evt) => {
          // Calc indexes in original "list" from those in "rows"
          let oldIndex = evt.oldIndex
          let newIndex = evt.newIndex
          const row = this.rows[oldIndex]
          let rows = [row]
          const downward = newIndex > oldIndex
          if (this.groupBy) {
            if (this.draggingGroup) {
              this.draggingGroup = false
              // Beware! 
              // oldIndex was taken from the full list without draggingGroup=true, 
              // newIndex is from draggingGroup=true, so directly the group index
              oldIndex = self.getGroupIndex(oldIndex)
              rows = self.getGroup(oldIndex)
              const newRows = self.getGroup(newIndex)
              oldIndex = this.list.indexOf(rows[0])
              newIndex = this.list.indexOf(newRows[0])
              if (newIndex > oldIndex) {
                // If dragging downward, you want to place the group AFTER the target group
                // But beware, on insert, the old group is already removed, so indexes are changing
                newIndex += newRows.length-rows.length
              }
            } else {
              oldIndex = this.list.indexOf(row)
              let newRow = this.rows[newIndex]
              let newForRegroup = evt.newIndex
              if (newRow.$group) {
                // If you drag an item onto a group line
                // You want the item in the group above
                if (newIndex>0) {
                  newRow = this.rows[newIndex-1] // The last item of the target group
                  newIndex = this.list.indexOf(newRow) + 1 // place it after that item
                  if (downward) newIndex-- // If you drag down, you want it on top
                  else newForRegroup-- // If you drag up on a group row - you want it on the group above
                } else {
                  // Place it on pos=0
                }
              } else {
                newIndex = this.list.indexOf(newRow)
              }
              for (let i=newForRegroup; i>=0; i--) {
                if (this.rows[i].$group) {
                  row[this.groupBy.field] = this.rows[i].value
                  break;
                }
              }
            }
          }
          // console.log('moving rows', oldIndex, newIndex, rows.length, rows[0][this.groupBy.field])
          this.list.splice(oldIndex, rows.length)
          this.list.splice(newIndex, 0, ...rows)
          this.$emit('sort', rows, oldIndex, newIndex)
          this.rerender++;
          this.$nextTick(() => this.setSort())
        }
      })
    },
    // Which group is this?
    getGroupIndex(index) {
      let result = 0
      while(--index >= 0) {
        if (this.rows[index].$group) result++
      }
      return result
    },
    getGroup(index) {
      let group = 0
      const result = []
      let current = this.list[0][this.groupBy.field]
      this.list.forEach(item => {
        if (current != item[this.groupBy.field]) {
          current = item[this.groupBy.field]
          group++
        }
        if (group==index) result.push(item)
      })
      return result
    },

    async onEnter(row, column, index) {
      const newItem = this.create(index+1)
      this.$emit('create', newItem, index+1)
      if (!row.id) {
        // await this.create(row)
        return
      } else {
        // const newItem = this.addNew(groupIndex, index+1)
        // if (this.copyOnEnter) this.copyOnEnter.forEach(name => newItem[name] = row[name])
      }
      const i = this.firstFocusable || column
      if (i==null) return
      this.$nextTick(() => {
        const key = `field-${index+1}-${i}`
        let ref = this.$refs[key]
        if (Array.isArray(ref)) ref = ref[0]
        ref.focus()
      })
      event.preventDefault()
    },
    async remove(row, ask=true) {
      try {
        if (ask) {
          try {
            await this.$confirm('Are you sure?', 'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            })
          } catch (cancel) {
            return
          }
        }
        this.$emit('remove', row)
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        //if (list.length==0) this.addNew(groupIndex)
        //this.getList()
      } catch (error) {
        this.$notify({
          title: 'Error',
          message: error.message,
          type: 'error',
          duration: 15000
        })
      }

    },
    async onDelete(event, row, column, index, val=null) {
      const i = this.firstFocusable || column

      const value = this.columns ? row[this.columns[column].name] : val
      if (value || column!=i) return
      if (!row.id) {
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      } else {
        //this.remove(groupIndex, row)
      }
      this.$nextTick(() => {
        const key = `field-${index-1}-${column}`
        let ref = this.$refs[key]
        if (Array.isArray(ref)) ref = ref[0]
        if (ref) {
          ref.focus()
        }
      })
      event.preventDefault()
    },
    onArrow(column, index, dir) {
      if (0 <= index + dir && index + dir < this.list.length) {
        const key = `field-${index + dir}-${column}`
        let ref = this.$refs[key]
        if (Array.isArray(ref)) ref = ref[0]
        this.$nextTick(() => {
          ref.focus()
        })
      }
    },
  },
}
</script>

<style>
.input-disabled {
  padding: 0 15px;
}
i.action {
  color: #AAAAAA;
  cursor: pointer;
  font-size: 150%;
  margin-top: 10px;
  margin-left: 10px;
}
i.grab {
  color: #EEEEEE;
  cursor: grab;
  font-size: 17px;
  vertical-align: -3px;
}
svg.grab {
  cursor: grab;
  height: 14px;
  width: 14px;
  vertical-align: -3px;
}
.group {
  margin-top: 10px;
}
.group-handle {
  margin-left: 10px;
  margin-right: 8px;
}
.heading {
  display: inline!important;
  margin-left: 12px;
}
.heading.el-select>.el-input {
  display: inline!important;
}
.heading input {
  font-size: 120%;
  font-weight: bold;
  width: 80%;
}
.grouped-header .handle {
  padding-left: 10px;
  padding-right: 5px;
}
.el-table .cell {
  text-overflow: clip;
}

.el-table--border {
  border: none!important;
}
.el-table--border::after {
  background-color: transparent!important;
}
.el-table--border td, .el-table--border th:not(:hover) {
  border-left: none!important;
  border-right: none!important;
}
</style>
