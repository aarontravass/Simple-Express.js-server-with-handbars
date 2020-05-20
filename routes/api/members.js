//-------------------------------------------------------------------
//http://localhost:5000/api/members
//http://localhost:5000/api/members/6
//--------------------------------------------------------------------

const express=require('express');
const uuid=require('uuid');
const router=express.Router();
const members=require('../../Members');

router.get('/',(req,res)=>{
    res.json(members);
});


router.get('/:id',(req,res)=>{
    //res.send(req.params.id);
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found){
        res.json(members.filter(member=>member.id===parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg:`No member with id of ${req.params.id}`});
    }
});

router.post('/', (req,res)=>{
    const newMember = {
      id: uuid.v4(),
      name: req.body.name,
      email: req.body.email,
      status: 'active'
    }
    if(!newMember.name || !newMember.email){
     return res.status(400).json({msg : 'Please include a name and an email'})
    }
  
    members.push(newMember)
    res.json(members)
    //res.redirect('/');
    
  })

//update

router.put('/:id',(req,res)=>{
    //res.send(req.params.id);
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found){
        const updateMember=req.body;
        members.forEach(member=>{
            if(member.id==parseInt(req.params.id)){
                member.name=updateMember.name?updateMember.name:member.name;
                member.email=updateMember.email?updateMember.email:member.email;

                res.json({msg:"Member was updated",member});
            }
        });
    }
    else{
        res.status(400).json({msg:`No member with id of ${req.params.id}`});
    }
});


//delete member


router.delete('/:id',(req,res)=>{
    //res.send(req.params.id);
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found){
        res.json({msg:'Member deleted',members:members.filter(member=>member.id!==parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg:`No member with id of ${req.params.id}`});
    }
});
module.exports=router;