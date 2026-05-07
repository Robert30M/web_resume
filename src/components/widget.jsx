import { Rnd } from "react-rnd";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

export default function Widget({
  title,
  children,
  defaultPosition = { x: 40, y: 120 },
  defaultSize = { width: 420, height: 260 },
}) {
  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={260}
      minHeight={160}
      bounds="window"
      dragHandleClassName="widget-drag-handle"
      style={{ zIndex: 10 }}
    >
      <Box
        sx={{
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 2,
          overflow: "hidden",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box
          className="widget-drag-handle"
          sx={{
            height: 36,
            px: 2,
            display: "flex",
            alignItems: "center",
            cursor: "move",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          {title}
        </Box>

        <Box sx={{ p: 2, height: "calc(100% - 36px)", overflow: "auto" }}>
          {children}
        </Box>
      </Box>
    </Rnd>
  );
}

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  defaultSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};