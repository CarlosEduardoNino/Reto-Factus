<template>
    <div class="p-6 min-h-screen">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">Listado de Facturas</h1>
  
      <!-- Filtros -->
      <div class="mb-4 p-4 bg-slate-600 rounded-lg flex flex-wrap gap-4">
        <q-input v-model="filters.identification" label="Identificación" @keydown.enter="fetchFacturas" class="bg-slate-800 text-white" />
        <q-input v-model="filters.names" label="Nombre" @keydown.enter="fetchFacturas" class="bg-slate-800 text-white" />
        <q-input v-model="filters.number" label="Número" @keydown.enter="fetchFacturas" class="bg-slate-800 text-white" />
        <q-input v-model="filters.reference_code" label="Código de Referencia" @keydown.enter="fetchFacturas" class="bg-slate-800 text-white" />
        <q-select v-model="filters.status" label="Estado" @keydown.enter="fetchFacturas" :options="statusOptions" class="bg-slate-800 text-white">
          <q-option value="" label="Estado" />
          <q-option value="1" label="Activo" />
          <q-option value="0" label="Inactivo" />
        </q-select>
        <q-btn @click="fetchFacturas" label="Filtrar" color="primary" />
        <q-btn @click="ClearAll" label="Limpiar" color="secondary" />
      </div>
  
      <!-- Tabla de facturas -->
      <div v-if="loading" class="text-center text-gray-600">Cargando...</div>
      <div v-else>
        <q-table
          :rows="facturas"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          @request="fetchFacturas"
        >
          <template v-slot:top-right="props">
            <!-- Paginación en un select desplegable -->
            <q-select
              v-model="pagination.page"
              :options="pageOptions"
              label="Selecciona página"
              class="q-ma-xs"
              @input="onPageChange"
              dense
            />
          </template>
  
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat color="blue" label="Ver" @click="viewFactura(props.row.number)" />
              <q-btn flat color="blue" label="Descargar" @click="downloadFactura(props.row.number)" />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from '../plugins/axios.js';
  import { QTable, QInput, QSelect, QBtn, QPagination, QTd } from 'quasar';
  
  const router = useRouter();
  const facturas = ref([]);
  const loading = ref(true);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const totalPages = ref(1);
  
  const filters = ref({
    identification: '',
    names: '',
    number: '',
    reference_code: '',
    status: ''
  });
  
  const statusOptions = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' }
  ];
  
  const pagination = ref({
    page: currentPage.value,
    rowsPerPage: itemsPerPage.value,
    rowsNumber: 0
  });
  
  // Generar las opciones de las páginas disponibles
  const pageOptions = computed(() => {
    const pages = [];
    const maxPagesToShow = 5; // Número máximo de páginas a mostrar en el desplegable
    const startPage = Math.max(pagination.value.page - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages.value);
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push({ label: `Página ${i}`, value: i });
    }
  
    return pages;
  });
  
  const columns = [
    { name: 'number', label: 'Número', align: 'left', field: row => row.number },
    { name: 'names', label: 'Cliente', align: 'left', field: row => row.names },
    { name: 'identification', label: 'Identificación', align: 'left', field: row => row.identification },
    { name: 'status', label: 'Estado', align: 'left', field: row => (row.status === 1 ? 'Activo' : 'Inactivo') },
    { name: 'total', label: 'Total', align: 'right', field: row => row.total },
    { name: 'actions', label: 'Acciones', align: 'center' }
  ];
  
  const ClearAll = () => {
    filters.value.identification = '';
    filters.value.names = '';
    filters.value.number = '';
    filters.value.reference_code = '';
    filters.value.status = '';
    fetchFacturas();
  };
  
  const fetchFacturas = async () => {
    loading.value = true;
    try {
      const response = await axios.get('/v1/bills', {
        params: {
          'filter[identification]': filters.value.identification,
          'filter[names]': filters.value.names,
          'filter[number]': filters.value.number,
          'filter[reference_code]': filters.value.reference_code,
          'filter[status]': filters.value.status,
          'page': pagination.value.page,
          'per_page': pagination.value.rowsPerPage
        }
      });
      facturas.value = response.data.data.data;
      pagination.value.rowsNumber = response.data.data.pagination.total;
      totalPages.value = response.data.data.pagination.last_page;
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const onPageChange = (page) => {
    pagination.value.page = page;
    fetchFacturas();
  };
  
  const viewFactura = (number) => {
    router.push({ name: 'VerFactura', params: { number } });
  };
  
  const downloadFactura = async (number) => {
    try {
      const response = await axios.get(`/v1/bills/download-pdf/${number}`);
      const pdfBase64 = response.data.data.pdf_base_64_encoded;
      const linkSource = `data:application/pdf;base64,${pdfBase64}`;
      const downloadLink = document.createElement('a');
      const fileName = `${response.data.data.file_name}.pdf`;
  
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (error) {
      console.error('Error al descargar la factura:', error);
    }
  };
  
  onMounted(fetchFacturas);
  </script>
  
  <style scoped>
  /* Estilos específicos para la vista de facturas */
  </style>
  