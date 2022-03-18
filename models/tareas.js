const Tarea = require('./tarea');

var colors = require ('colors');

class Tareas{
    _listado = {};  

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado
    }


    constructor(){
        this._listado={};
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        //1: Verde
        // Completada: Verde
        // Pendiente ::Rojo
        //1. Alma :: Completada | Pendiente
        //2. Poder:: Completada | Pendiente
        // let completado = this.listadoArr.map(value => value.completadoEn);
        // return completado
        let x = 1;
        this.listadoArr.forEach(tarea => {
            if (tarea.completadoEn){
                console.log(colors.green('%s. %s :: Completado el %s'),x,tarea.desc,tarea.completadoEn)
                x++;
            }else
            {
                console.log(colors.red('%s. %s :: Pendiente'),x,tarea.desc)
                x++;
            }
        });
    }

    listarPendientesCompletadas(completadas = true){
        let x = 1;
        this.listadoArr.forEach(tarea=>{
            if (completadas){
                if(tarea.completadoEn){
                    console.log(colors.green('%s. %s :: Completado el %s'),x,tarea.desc,tarea.completadoEn);
                    x++;
                }
            }else
            {
                if(!tarea.completadoEn){
                    console.log(colors.red('%s. %s :: Pendiente'),x,tarea.desc);
                    x++;
                }else{
                    
                }
            }
            
        })
    }

    toogleCompletadas (ids=[]){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea=>{
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;