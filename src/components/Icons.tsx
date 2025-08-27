type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  main: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={187}
      height={149}
      fill="none"
      {...props}
    >
      <path fill="#18371C" d="M0 79h187v70H0z" />
      <rect width={163} height={87} x={12} y={27} fill="#fff" rx={43.5} />
      <rect width={51} height={46} x={34} fill="#FFDCDC" rx={23} />
      <rect width={51} height={46} x={106} fill="#FFDCDC" rx={23} />
      <rect width={58} height={46} x={65} fill="#FCC" rx={23} />
    </svg>
  ),
};
