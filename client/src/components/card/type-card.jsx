import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

export default function OverflowCard(props) {
   return (
      <div className="hover:opacity-80 border-[2px] border-white hover:border-blue-700 rounded-lg ">
         <Card variant="outlined" sx={{ width: 320, height: 240 }}>
            <CardOverflow>
               <AspectRatio ratio="2">
                  <img
                     src={props.img}
                     srcSet={props.img}
                     loading="lazy"
                     alt=""
                     style={{ objectFit: "contain", height: "60% !important" }}
                  />
               </AspectRatio>
            </CardOverflow>
            <CardContent>
               <Typography level="title-md">{props.content}</Typography>
            </CardContent>
         </Card>
      </div>
   );
}
