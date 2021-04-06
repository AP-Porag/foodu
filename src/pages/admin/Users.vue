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
        <q-btn color="primary" :disable="loading" label="Add User"  @click="addCategoryDialog = true" no-caps></q-btn>
        <q-dialog v-model="addCategoryDialog">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6">Add New User</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                class="q-gutter-md"
              >
                <div class="row">
                  <div class="col-12 col-md-12 q-pt-md q-pr-md">
                    <q-input
                      v-model="formData.name"
                      type="text"
                      label="User Name"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please write User name']"
                    />
                    <q-input
                      label="User email"
                      type="text"
                      v-model="formData.email"
                      aria-required="true"
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
                </div>

                <div class="row">
                  <q-btn
                    label="Save"
                    color="primary"
                    class="col"
                    @click="addNewUser"
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
          <q-td key="email" :props="props">
            <span class="" style="font-size: 16px;">{{ props.row.email }}</span>
          </q-td>
          <q-td key="avatar" :props="props">
            <q-avatar
              class="shadow-10"
            >
              <img :src="props.row.avatar">
            </q-avatar>
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
        email:'',
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
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true
        },
        {
          name: "avatar",
          align: "center",
          label: "Avatar",
          field: "avatar",
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
      this.formData.email = ''
      //this.formData.thumbnail = ''
    },
    async addNewUser(){
      const newUser = {
        email : this.formData.email,
        password : this.formData.email,
      }
      await this.$auth.createUserWithEmailAndPassword(newUser.email,newUser.password)
        .then(response=>{
          const userID = this.$auth.currentUser.uid;
          //saving data to firebase firestore
          const addNewUser = {
            name : this.formData.name,
            email : this.formData.email,
            avatar:'https://cdn.quasar.dev/img/boy-avatar.png',
            role:'admin',
            created_at : Date.now(),
          }

          this.$database.collection('users').doc(userID).set(addNewUser)
            .then(response=>{

            })
            .catch(error=>{
              console.log(error);
            })

        })
        .catch(error=>{
          console.log(error)
        })
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
      confirm("Are you sure you want to delete this User?") &&

      //deleted data from firebase firestore
      this.$database.collection("users").doc(itemID).delete().then(() => {
        //console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });

      //deleted data from firebase authentication needed
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
    this.$database.collection("users").where("role", "==", "admin").onSnapshot((snapshot) => {
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
            const index = this.data.findIndex(user => changedData.id);
            this.data.splice(index, 1);
          }
        });
      });
  }
}
</script>
