import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


const bull = (
  <Box
    component="span"
    sx={{ mx: "2px", transform: "scale(0.8)" }}
  >
    
  </Box>
);

export default function BasicCard({card,darkMode}) {

  let bgColor= darkMode ? "white" :"rgba(98, 96, 96, 0.2)";
  let color= darkMode ? "black" : "white";
  return (
    <Card
      sx={{
        color:color,
        width: "350px",
        backgroundColor: bgColor,
        display: "inline-block",
        mx: "2px",
        transform: "scale(0.8)",
        borderRadius:"10px",
        height:"200px",
      }}
    >
      <CardContent>
        <div className={``}>
          <div className="w-15 bg-[rgba(255,255,255,0.7)] rounded-2xl p-2 mb-2">
            <img src={card.img} alt="" className="w-full"/>
          </div>
          <h1 className={`text-3xl ${darkMode ? "text-black" : ""} mb-2`}>{card.title}</h1>
          <p className={`${darkMode ? "text-black" : "text-[rgba(255,255,255,0.7)]"} `}>{card.desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}
