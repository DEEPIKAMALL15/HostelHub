 import User from "../models/User.js";
import { Webhook } from "svix";


const clerkWebhooks = async (req,res)=> {
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };
        await whook.verify(JSON.stringify(req.body), headers);
        const {data, type} = req.body;
        

        switch(type) {
            case "user.created":{
                const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }
                await User.create(userData);
                break;
            }
            case "user.updated":{
                const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
        res.json({success: true, message: "Webhook Recieved"})

    } catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message})
    }

}

export default clerkWebhooks; 
/* import User from "../models/user.js";
import { Webhook } from "svix";
import getRawBody from "raw-body";

export const config = {
  api: {
    bodyParser: false,
  },
};

const clerkWebhooks = async (req, res) => {
  try {
    const payload = (await getRawBody(req)).toString();
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, headers); // throws if invalid

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.create(userData);
        break;
      }
      case "user.updated": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        break;
    }

    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
 */