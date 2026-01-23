import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";

export default function BasicCard({card}) {

   const [darkMode]=useContext(DarkMode);

  let bgColor= darkMode ? "rgba(255,255,255,0.1)" :"rgba(98, 96, 96, 0.2)";
  let color= darkMode ? "white" : "black";
  
  return (
    <Card
      sx={{
        color:color,
        width: "100%",
        maxWidth: "350px",
        backgroundColor: bgColor,
        borderRadius:"10px",
        height:"auto",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
        }
      }}
    >
      <CardContent sx={{ padding: "16px", "&:last-child": { paddingBottom: "16px" } }}>
        <div className="flex flex-col gap-3">
          <div className="w-18 bg-[rgba(255,255,255,0.7)] rounded-2xl p-2">
            <img src={card.img} alt={card.title} className="w-full h-auto object-cover"/>
          </div>
          <h1 className={`text-lg sm:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{card.title}</h1>
          <p className={`text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"} line-clamp-2`}>{card.desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}
