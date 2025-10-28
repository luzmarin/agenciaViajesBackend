import listaTareas from '../db/data.js';


const responseAPI = {
    data: [],
    msg:"",
    status:"ok",
    cant: null
}


//Create
export const createTarea = (req,res) => {
    const datos = req.body;
    const newId = Math.floor(Math.random()*100000);

    const newTarea = {
        id: newId,
        tarea: datos.tarea
    }
    
    console.log("Nueva tarea es: ", newTarea);

    listaTareas.push(responseAPI);

    responseAPI.msg="tarea creada correctamente";
    responseAPI.data = newTarea;

    res.json(responseAPI);
}

//GetAllTareas
export const getAllTareas = (req,res, next) => {
    try{
        //devuelvo las tareas de la dB
        responseAPI.msg="Aqui tienes tus tareas";
        responseAPI.data=listaTareas;
        responseAPI.cant=listaTareas.length;

        res.json(responseAPI);
    }catch (error){
        next(error)
    }
}

//getTarea
export const getTarea = (req,res) => {
    const { idtarea } = req.params;
    
    //busco la tarea
    const tuTarea = listaTareas.find( t => idtarea == t.id );

    //si no encuentra la tarea
    if(!tuTarea) res.json({error:"Tarea no encontrada"});

    //devuelve tarea encontrada
    responseAPI.msg=`Aqui tienes tus tareas: ${idtarea}`;
    responseAPI.data=tuTarea;

    // quitar cualquier prop
    delete responseAPI.cant;
   // responseAPI.cant=listaTareas.length;

    res.json(responseAPI);
}

//updateTarea
export const updateTarea = (req,res) => {
    const {idtarea} = req.params;
    const datos = req.body;

    const index = listaTareas.findIndex( t => t.id == idtarea );

    // si index -1 devolver un error!
    if(index == -1) { res.json}({error:"Tarea no encontrada"})
    
    const tarea = listaTareas[index];

    //Patch de tarea
    listaTareas[index]= {
        ...tarea,
        tarea: datos.tarea
    }
}
//deleteTarea
export const deleteTarea = (req,res) => {
    const {idtarea} = req.params;

// devolver todas las tareas, EXCEPTO la que tiene el id a borrar
    const index = listaTareas.findIndex(t => t.id == idtarea)

    listaTareas.splice(index, 1);

    res.send(`Tarea ${idtarea} eliminada`);
}
