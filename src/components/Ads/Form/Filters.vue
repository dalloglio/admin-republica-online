<template>
  <div v-if="filters.length" id="filters">
    <el-card class="box-card">
      <h2>Filtros</h2>
      <el-row :gutter="20">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" v-for="(filter, index) in filters" :key="filter.id">
          <el-form-item :label="filter.title">
            <el-select v-model="form.details[filter.id]" :placeholder="filter.description">
              <el-option v-for="input in filter.inputs" :key="input.id" :label="input.value" :value="input.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ads-form-filters',
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    computed: {
      filters () {
        return this.$store.state.category.category.filters || []
      }
    }
  }
</script>
