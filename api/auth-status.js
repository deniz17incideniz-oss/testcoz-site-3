import { sheetsConfigured } from "./_lib/sheets.js";
export default function handler(req,res){res.setHeader("Cache-Control","no-store");if(req.method!=="GET")return res.status(405).json({success:false});const configured=sheetsConfigured()&&Boolean(process.env.JWT_SECRET&&process.env.JWT_SECRET.length>=32);return res.status(200).json({success:true,configured});}
