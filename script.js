Vue.component('nota', {
    props: ['tarea'],
    template: `
    <div>
        <P v-bind:class="{active: tarea.completada}">
            <input type="checkbox" v-model="tarea.completada">{{tarea.nombre}}
        </P>
    </div>
    `,
});

var app = new Vue({
    el: "#app",
    data: {
        nombre: "",
        asc: "ascendente",
        tareas: [],
    },
    computed: {
        terminada: function () {
            contador = 0;
            for (tarea of this.tareas) {
                if (tarea.completada)
                    contador++;
            }
            return contador;
        },
        total: function () {
            return this.tareas.length;
        },
        ordenado: function () {
            if (this.asc == "ascendente") {
                return this.tareas.sort(function (nota1, nota2) {
                    a = nota1.nombre.toLowerCase();
                    b = nota2.nombre.toLowerCase();
                    return (a < b) ? -1 : (a > b) ? 1 : 0;
                });
            } else {
                return this.tareas.sort(function (nota1, nota2) {
                    a = nota1.nombre.toLowerCase()
                    b = nota2.nombre.toLowerCase();
                    return (a < b) ? 1 : (a > b) ? -1 : 0;
                });
            }
        }
    },
    mounted() {
        if (localStorage.getItem("tareas")) {
            try {
                this.tareas = JSON.parse(localStorage.getItem("tareas"));
            }
            catch (e) {
                localStorage.removeItem("tareas");
            }

        }
    },
    updated() {
        this.save();
    },
    methods: {
        add() {
            if (!this.nombre) {
                return;
            }
            this.tareas.push({ nombre: this.nombre, completada: this.completada });
            this.nombre = "";
            this.save();
        },
        save() {
            const parsed = JSON.stringify(this.tareas);
            localStorage.setItem("tareas", parsed);
        },
        borrarCompletados() {
            this.tareas = this.tareas.filter(function (tarea) {
                return !tarea.completada;
            });
            this.save();
        }
    }
});