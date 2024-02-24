function KebabMenuWhite(props) {
  const color = props?.color || "white";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M12.3232 13.6797C12.8755 13.6797 13.3232 13.232 13.3232 12.6797C13.3232 12.1274 12.8755 11.6797 12.3232 11.6797C11.771 11.6797 11.3232 12.1274 11.3232 12.6797C11.3232 13.232 11.771 13.6797 12.3232 13.6797Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.3232 6.67969C12.8755 6.67969 13.3232 6.23197 13.3232 5.67969C13.3232 5.1274 12.8755 4.67969 12.3232 4.67969C11.771 4.67969 11.3232 5.1274 11.3232 5.67969C11.3232 6.23197 11.771 6.67969 12.3232 6.67969Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.3232 20.6797C12.8755 20.6797 13.3232 20.232 13.3232 19.6797C13.3232 19.1274 12.8755 18.6797 12.3232 18.6797C11.771 18.6797 11.3232 19.1274 11.3232 19.6797C11.3232 20.232 11.771 20.6797 12.3232 20.6797Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default KebabMenuWhite;
