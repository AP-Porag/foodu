<template>
  <div class="q-pa-md">
    <q-table title="Treats" :data="data" :columns="columns" row-key="name" binary-state-sort>
      <template v-slot:top>
                <q-input borderless filled dense debounce="300" color="primary" v-model="filter">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
        <q-space />
        <q-btn color="primary" :disable="loading" label="Add Category"  @click="addCategoryDialog = true" no-caps></q-btn>
        <q-dialog v-model="addCategoryDialog">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6">Add Category</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                class="q-gutter-md"
              >
                <div class="row">
                  <div class="col-12 col-md-8 q-pt-md q-pr-md">
                    <q-input
                      v-model="formData.name"
                      type="text"
                      label="Category Name"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please write category name']"
                    />
                    <q-input
                      borderless
                      readonly
                      filled
                      type="text"
                      v-model="formData.name"
                    />
<!--                    <q-file-->
<!--                      class="q-mt-md"-->
<!--                      v-model="formData.thumbnail"-->
<!--                      label="Pick files"-->
<!--                      filled-->
<!--                      max-files="1"-->
<!--                      counter-->
<!--                      :counter-label="counterLabelFn"-->
<!--                    >-->
<!--                      <template v-slot:prepend>-->
<!--                        <q-icon name="attach_file" />-->
<!--                      </template>-->
<!--                    </q-file>-->
                  </div>
                  <div class="col-12 col-md-4 bg-blue-grey-2">
<!--                    <q-img-->
<!--                      v-if="preview == null"-->
<!--                      class="bg-blue-grey-2"-->
<!--                      v-else-->
<!--                      src=""-->
<!--                      style="min-height: 100%; max-width: 100%"-->

<!--                    >-->
<!--                      <template v-slot:loading>-->
<!--                        <div class="text-yellow">-->
<!--                          <q-spinner-ios />-->
<!--                          <div class="q-mt-md">Loading...</div>-->
<!--                        </div>-->
<!--                      </template>-->
<!--                    </q-img>-->
                  </div>
                </div>

                <div class="row">
                  <q-btn
                    label="Save"
                    color="primary"
                    class="col"
                    @click="addNewCategory"
                    v-close-popup
                  ></q-btn>
                  <q-btn label="Reset" color="primary" class="q-ml-sm col" @click="onReset"/>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <div class="q-pa-sm q-gutter-sm">
          <q-dialog v-model="show_dialog">
            <q-card>
              <q-card-section>
                <div class="text-h6">Add new item!</div>
              </q-card-section>

              <q-card-section>
                <div class="row">
                  <q-input v-model="editedItem.name" label="Dessert Name"></q-input>
                  <q-input v-model="editedItem.calories" label="Calories"></q-input>
                  <q-input v-model="editedItem.fat" label="Fat"></q-input>
                  <q-input v-model="editedItem.carbs" label="Carbs"></q-input>
                  <q-input v-model="editedItem.protein" label="Protein"></q-input>
                  <q-input v-model="editedItem.sodium" label="Sodium"></q-input>
                  <q-input v-model="editedItem.calcium" label="Calcium"></q-input>
                  <q-input v-model="editedItem.iron" label="Iron"></q-input>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup @click="addRow" ></q-btn>
              </q-card-actions>
              </q-card>
          </q-dialog>
        </div>

      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            <span class="text-capitalize text-h6">{{ props.row.name }}</span>
          </q-td>
          <q-td key="thumbnail" :props="props">
            <q-img
              :src="props.row.thumbnail"
              class="shadow-10"
              style="width: 100px;"
            />
          </q-td>
          <q-td key="product_count" :props="props">
            <span class="text-capitalize text-h6">{{ props.row.product_count }}</span>
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn dense color="blue" icon="edit" @click="editItem(props.row)" no-caps class="q-mr-md"></q-btn>
            <q-btn dense color="negative" icon="delete_forever"  @click="deleteItem(props.row)" no-caps></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      filter: '',
      addCategoryDialog:false,
      //files: null,
      formData:{
        name:'',
        slug:'',
        //thumbnail:''
      },
      show_dialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        sodium: 0,
        calcium: "0%",
        iron: "0%"
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        sodium: 0,
        calcium: "0%",
        iron: "0%"
      },
      columns: [
        {
          name: "desc",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "thumbnail",
          align: "center",
          label: "Thumbnail",
          field: "thumbnail",
          sortable: true
        },
        {
          name: "product_count",
          align: "center",
          label: "Product count",
          field: "product_count",
          sortable: true
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions"
        }
      ],
      data: []
    }
  },

  methods: {
    // emulate fetching data from server
    // counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
    //   return `${filesNumber} formData.thumbnail of ${maxFiles} | ${totalSize}`
    // },
    onReset(){
      this.formData.name = ''
      this.formData.slug = ''
      //this.formData.thumbnail = ''
    },
    addNewCategory(){
      const newCategory = {
        name : this.formData.name,
        slug : this.formData.name,
        product_count : 0,
        thumbnail : 'https://cdn.quasar.dev/img/chicken-salad.jpg',
        date : Date.now(),
      }

      //saving data to firebase firestore
      // Add a new document with a generated id.
      this.$database.collection("categories").add(newCategory)
        .then((docRef) => {
          const newCategoryID = docRef.id;
          //console.log("Document written with ID: ", newCategoryID);
          if (newCategoryID){
            this.formData.name = ''
            this.formData.slug = ''
          }
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    //copied start
    addRow() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close()
    },
    deleteItem(item) {
      const itemID = item.id;
      confirm("Are you sure you want to delete this category?") &&

      //deleted data from firebase firestore
      this.$database.collection("categories").doc(itemID).delete().then(() => {
        //console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.show_dialog = true;
    },
    close () {
      this.show_dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
    //copied end
  },
  mounted() {
    this.$database.collection("categories").orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {

          const changedData = change.doc.data();
          changedData.id = change.doc.id;

          if (change.type === "added") {
            //console.log("New category: ", changedData);
            this.data.unshift(changedData)
          }
          if (change.type === "modified") {
            console.log("Modified category: ", changedData);
          }
          if (change.type === "removed") {
            //console.log("Removed category: ", changedData);
            const index = this.data.findIndex(category => changedData.id);
            this.data.splice(index, 1);
          }
        });
      });
  }
}
</script>
