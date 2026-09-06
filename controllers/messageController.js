import Conversation from "../models/ConversationModel";

export const sendMessage = async (req,res)=>{
 try{
  const senderId = req.id;
  const recieverId = req.params.id;

  const{message} = req.body;
  let gotConversation = await Conversation.findOne({participants :{$all :[senderId,recieversId]}, });
  if(!gotConversation){
    gotConversation = await converstation.create
  }
 } catch(error){
  console.log(error);
 }
}