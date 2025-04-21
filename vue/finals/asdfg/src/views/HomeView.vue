<template>
  <v-card color="light-blue-lighten-5">
    <v-layout>
      <!-- Navigation Drawer -->
      <v-navigation-drawer class="bg-light-blue-darken-3" theme="dark" permanent>
        <!-- Water Purification Title -->
        <span class="text-h5 font-weight-bold text-black text-center mt-4 ml-4 px-4 py-2 rounded-lg" 
          style="background-color: #b3e5fc; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); display: inline-block;">
          Water Purification
        </span>
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" />
          <v-list-item prepend-icon="mdi-account-box" title="Account" />
          <v-list-item prepend-icon="mdi-gavel" title="Admin" />
        </v-list>

        <template v-slot:append> 
          <div class="pa-2">
            <v-btn block color="light-blue-lighten-4">Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <!-- Banner -->
          <v-banner elevation="2" class="mb-6" style="background-color: #e1f5fe;">
            <template #text>
              <span class="text-h5 font-weight-bold text-black">Dashboard</span>
            </template>
          </v-banner>

          <!-- Dashboard Section (Chart + Table) -->
          <v-row dense>
            <!-- Sparkline Chart -->
            <v-col cols="12" md="6">
              <v-card class="pa-4" elevation="2" color="light-blue-lighten-4 h-100">
                <h3 class="text-subtitle-1 font-weight-bold mb-3">User Activity Graph</h3>
                <v-sparkline
                  :fill="fill"
                  :gradient="selectedGradient"
                  :line-width="lineWidth"
                  :model-value="value"
                  :padding="padding"
                  :smooth="smooth"
                  auto-draw
                />
                <v-divider class="my-4" />
                <!-- Controls -->
                <v-row dense>
                  <v-col cols="6">
                    <div class="mb-1">Gradient:</div>
                    <v-item-group v-model="selectedGradient" mandatory>
                      <v-row dense>
                        <v-item
                          v-for="(gradient, i) in gradients"
                          :key="i"
                          :value="gradient"
                          v-slot="{ active, toggle }"
                        >
                          <v-card
                            :style="{
                              background: gradient.length > 1
                                ? `linear-gradient(0deg, ${gradient})`
                                : gradient[0],
                              border: '2px solid',
                              borderColor: active ? '#222' : 'white'
                            }"
                            class="me-2"
                            height="30"
                            width="30"
                            @click="toggle"
                          />
                        </v-item>
                      </v-row>
                    </v-item-group>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <!-- Registered Users -->
            <v-col cols="12" md="6">
              <v-card class="pa-4 h-100" elevation="2" color="light-blue-lighten-4">
                <h3 class="text-subtitle-1 font-weight-bold mb-3">Registered Users</h3>

                <v-data-table
                  :headers="headers"
                  :items="users"
                  class="elevation-1"
                  density="compact"
                  hide-default-footer
                >
                  <template v-slot:header.name>
                    <span class="text-h10 font-weight-bold text-black">Name</span>
                  </template>
                  <template v-slot:header.contact>
                    <span class="text-h10 font-weight-bold text-black">Contact</span>
                  </template>
                  <template v-slot:header.location>
                    <span class="text-h10 font-weight-bold text-black">Location</span>
                  </template>
                  <template v-slot:header.date>
                    <span class="text-h10 font-weight-bold text-black">Date Registered</span>
                  </template>

                  <template #item.name="{ item }">
                    <v-col class="text-black">{{ item.name }}</v-col>
                  </template>
                  <template #item.contact="{ item }">
                    <v-col class="text-black">{{ item.contact }}</v-col>
                  </template>
                  <template #item.location="{ item }">
                    <v-col class="text-black">{{ item.location }}</v-col>
                  </template>
                  <template #item.date="{ item }">
                    <v-col class="text-black">{{ item.date }}</v-col>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>

            <!-- Water Quality -->
            <v-col cols="12" md="6">
              <v-card class="pa-4 h-100" elevation="2" color="light-blue-lighten-4">
                <h3 class="text-subtitle-1 font-weight-bold mb-3">Water Quality (Live)</h3>
                <v-row dense>
                  <v-col cols="6"><strong>pH Level:</strong> 7.2</v-col>
                  <v-col cols="6"><strong>Turbidity:</strong> 1.5 NTU</v-col>
                  <v-col cols="6"><strong>Temperature:</strong> 25°C</v-col>
                  <v-col cols="6"><strong>TDS:</strong> 300 ppm</v-col>
                  <v-col cols="6"><strong>Ammonia Level:</strong> 0.15 ppm</v-col>
                  <v-col cols="6"><strong>Flow Rate:</strong> 2.1 L/min</v-col>
                </v-row>
              </v-card>
            </v-col>

            <!-- Alerts -->
            <v-col cols="12" md="6">
              <v-card class="pa-4 h-100" elevation="2" color="light-blue-lighten-4">
                <h3 class="text-subtitle-1 font-weight-bold mb-3">System Alerts</h3>
                <v-alert type="warning" border="start" color="amber" variant="tonal">
                  Turbidity Level Exceeded Safe Threshold – 2.8 NTU
                </v-alert>
                <v-alert type="error" border="start" color="red" variant="tonal" class="mt-2">
                  Sensor 3 Disconnected!
                </v-alert>
              </v-card>
            </v-col>

            <!-- Status + Map -->
            <v-col cols="12">
              <v-row dense>
                <!-- Status -->
                <v-col cols="12" md="6">
                  <v-card class="pa-4 h-100" elevation="2" color="light-blue-lighten-4">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">System Status</h3>
                    <v-list dense>
                      <v-list-item title="Filtration System" subtitle="Running Smoothly" prepend-icon="mdi-water" />
                      <v-list-item title="Last Maintenance" subtitle="April 19, 2025" prepend-icon="mdi-calendar-check" />
                      <v-list-item title="Next Filter Replacement" subtitle="July 19, 2025" prepend-icon="mdi-autorenew" />
                    </v-list>
                  </v-card>
                </v-col>

                <!-- Map -->
                <v-col cols="12" md="6">
                  <v-card class="pa-4 h-100" elevation="2" color="light-blue-lighten-4">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3">User Location</h3>
                    <v-img 
                      src="@/assets/map.webp.gif" 
                      alt="Static Map Placeholder" 
                      width="100%" 
                      height="400"
                      style="border-radius: 10px; margin-top: -35px;"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>

  <!-- Footer -->
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="light-blue-lighten-2">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      />
    </div>

    <v-divider class="my-2" thickness="2" width="50" />
    <div class="text-caption font-weight-regular opacity-60">Thank you</div>
    <v-divider />
  </v-footer>
</template>

<script setup>
import { ref } from 'vue'

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#00c6ff', '#1feaea', '#00bcd4'], // Updated to a fresh water gradient
]
const fill = ref(true)
const selectedGradient = ref(gradients[5])
const padding = ref(8)
const smooth = ref(true)
const value = ref([0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0])
const lineWidth = ref(2)

const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-instagram',
  'mdi-linkedin',
]

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Contact', value: 'contact' },
  { text: 'Location', value: 'location' },
  { text: 'Date Registered', value: 'date' },
]

const users = ref([
  { name: 'Nelia Musico', contact: '09368023457', location: 'Carmundo, Bongabong', date: '2025-04-15' },
  { name: 'Jericho Aquino', contact: '09115503309', location: 'Tawas, Bongabong', date: '2025-04-18' },
  { name: 'Marcos Seina ', contact: '09325678687', location: 'Sigange, Bongabong', date: '2025-04-19' },
])
</script>