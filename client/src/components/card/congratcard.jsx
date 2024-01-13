import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";
export default function CongratCard({ title, content, link, color }) {
   return (
      <Card
         className="h-[320px]"
         sx={{
            textAlign: "center",
            alignItems: "center",
            width: 343,
            // to make the demo resizable
            overflow: "auto",

            "--icon-size": "100px",
         }}
      >
         <div className={`w-full h-[50px] ${color}`}></div>
         <Typography level="title-lg" sx={{ mt: "calc(var(--icon-size) / 2)" }}>
            🎊 {title} 🎊
         </Typography>
         <CardContent sx={{ maxWidth: "40ch" }}>{content}</CardContent>
         <CardActions
            orientation="vertical"
            buttonFlex={1}
            sx={{
               "--Button-radius": "40px",
               width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
            }}
         >
            <Link to={link}>
               <Button variant="solid" color="neutral">
                  {" "}
                  Use
               </Button>
            </Link>
         </CardActions>
      </Card>
   );
}
