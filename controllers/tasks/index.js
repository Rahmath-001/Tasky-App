import express  from "express";

const router=express.Router();


router.post("/", (req,res)=> {
   try {
    res.status(200).json({success :"Router Started and Working"})
   } catch (error) {
    res.status(500).json({error :"router not working"})
   }
})


router.get("/tasks", (req,res)=>{
    try {
        res.status(200).json({success :"Task delete is UP"})
       } catch (error) {
        res.status(500).json({error :"router not working"})
       }
})

router.delete("/:task_id", (req,res)=> {
    try {
     res.status(200).json({success :"Task delete is UP"})
    } catch (error) {
     res.status(500).json({error :"router not working"})
    }
 })


export default router;