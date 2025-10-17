import { Card, CardContent, Typography, IconButton, Box, Stack } from "@mui/material";
import { Pen, Trash } from "lucide-react";

interface CardProps {
  edited: string;
  deleted: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CommonCard = ({ edited, deleted, onEdit, onDelete }: CardProps) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "48%", md: "30%", lg: "22%" },
        borderRadius: 3,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "visible",
        cursor:'pointer'
        // "&:hover": {
        //   boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        //   transform: "translateY(-4px)",
        // },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={0.8}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ color: "#1f2937", wordBreak: "break-word" }}
          >
            {edited}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {deleted}
          </Typography>
        </Stack>

        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            gap: 0.5,
            background: "rgba(255,255,255,0.9)",
            p: 0.3
          }}
        >
          <IconButton
            onClick={onEdit}
            aria-label="edit"
            size="small"
            sx={{
              "&:hover svg": { color: "#0d9488" },
            }}
          >
            <Pen size={18} color="#00b894" />
          </IconButton>

          <IconButton
            onClick={onDelete}
            aria-label="delete"
            size="small"
            sx={{
              "&:hover svg": { color: "#dc2626" },
            }}
          >
            <Trash size={18} color="#ef4444" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommonCard;
