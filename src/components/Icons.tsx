import { SVGProps } from "react";

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
  mainTopBar: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={47}
      height={38}
      fill="none"
      {...props}
    >
      <path fill="#18371C" d="M0 20.118h47v17.383H0z" />
      <rect
        width={40.968}
        height={21.604}
        x={3.016}
        y={7.205}
        fill="#fff"
        rx={10.802}
      />
      <rect
        width={12.818}
        height={11.423}
        x={8.545}
        y={0.5}
        fill="#FFDCDC"
        rx={5.711}
      />
      <rect
        width={12.818}
        height={11.423}
        x={26.642}
        y={0.5}
        fill="#FFDCDC"
        rx={5.711}
      />
      <rect
        width={14.578}
        height={11.423}
        x={16.337}
        y={0.5}
        fill="#FCC"
        rx={5.711}
      />
    </svg>
  ),
  stats: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={27}
      fill="none"
      {...props}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1.5 25.5c5-3 7.5-6 7.5-9C9 12 7.5 12 6 12s-3.048 1.627-3 4.5c.051 3.072 2.487 4.316 3.75 6C9 25.5 10.5 26.25 12 24c1-1.5 1.75-2.75 2.25-3.75 1.5 3.5 3.5 5.25 6 5.25H24m0 0-3-3v-18c0-1.682 1.319-3 3-3s3 1.318 3 3v18l-3 3Zm-3-18h6"
      />
    </svg>
  ),
  settingsBlack: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={31}
      height={30}
      fill="none"
      {...props}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M12.988 3.475c.639-2.634 4.386-2.634 5.024 0a2.586 2.586 0 0 0 3.86 1.6c2.314-1.41 4.965 1.239 3.555 3.554a2.585 2.585 0 0 0 1.598 3.859c2.634.639 2.634 4.386 0 5.024a2.585 2.585 0 0 0-1.6 3.86c1.41 2.314-1.239 4.965-3.555 3.555a2.585 2.585 0 0 0-3.858 1.598c-.639 2.634-4.386 2.634-5.024 0a2.585 2.585 0 0 0-3.86-1.6c-2.314 1.41-4.965-1.239-3.555-3.555a2.586 2.586 0 0 0-1.598-3.858c-2.634-.639-2.634-4.386 0-5.024a2.586 2.586 0 0 0 1.6-3.86c-1.41-2.314 1.239-4.965 3.554-3.555 1.5.912 3.444.105 3.859-1.598Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M11 15a4.5 4.5 0 1 0 9 0 4.5 4.5 0 0 0-9 0Z"
      />
    </svg>
  ),
  settingsWhite: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={31}
      height={30}
      fill="none"
      {...props}
    >
      <path
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M12.988 3.475c.639-2.634 4.386-2.634 5.024 0a2.586 2.586 0 0 0 3.86 1.6c2.314-1.41 4.965 1.239 3.555 3.554a2.585 2.585 0 0 0 1.598 3.859c2.634.639 2.634 4.386 0 5.024a2.585 2.585 0 0 0-1.6 3.86c1.41 2.314-1.239 4.965-3.555 3.555a2.585 2.585 0 0 0-3.858 1.598c-.639 2.634-4.386 2.634-5.024 0a2.585 2.585 0 0 0-3.86-1.6c-2.314 1.41-4.965-1.239-3.555-3.555a2.586 2.586 0 0 0-1.598-3.858c-2.634-.639-2.634-4.386 0-5.024a2.586 2.586 0 0 0 1.6-3.86c-1.41-2.314 1.239-4.965 3.554-3.555 1.5.912 3.444.105 3.859-1.598Z"
      />
      <path
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M11 15a4.5 4.5 0 1 0 9 0 4.5 4.5 0 0 0-9 0Z"
      />
    </svg>
  ),
  heart: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={24}
      fill="none"
      {...props}
    >
      <path
        stroke="#903D1C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M26.736 3.358a7.192 7.192 0 0 0-10.173 0l-.86.859a.745.745 0 0 1-1.053 0l-.86-.86A7.193 7.193 0 1 0 3.618 13.532l8.399 8.399a4.47 4.47 0 0 0 6.322 0l8.398-8.4a7.192 7.192 0 0 0 0-10.172Z"
      />
    </svg>
  ),
  addBook: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={54}
      height={54}
      fill="none"
      {...props}
    >
      <path
        fill="#fff"
        d="M8.144 8.144a26.667 26.667 0 1 1 37.71 37.71A26.666 26.666 0 0 1 8.146 8.146l-.003-.003ZM29.667 19a2.667 2.667 0 0 0-5.334 0v5.333H19a2.667 2.667 0 0 0 0 5.334h5.333V35a2.667 2.667 0 0 0 5.334 0v-5.333H35a2.666 2.666 0 1 0 0-5.334h-5.333V19Z"
      />
    </svg>
  ),
  singlePage: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={33}
      height={30}
      fill="none"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M8.708 8.5h16.25M8.708 15h16.25m-16.25 6.5h16.25M2.208 5.25A3.25 3.25 0 0 1 5.458 2h22.75a3.25 3.25 0 0 1 3.25 3.25v19.5a3.25 3.25 0 0 1-3.25 3.25H5.458a3.25 3.25 0 0 1-3.25-3.25V5.25Z"
      />
    </svg>
  ),
  menu: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={29}
      height={24}
      fill="none"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M1.5 2.25h26M1.5 12h26m-26 9.75h26"
      />
    </svg>
  ),
  back: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={24}
      fill="none"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="m8.625 15.25-6.5-6.5 6.5-6.5"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M2.125 8.75H20a6.5 6.5 0 0 1 0 13h-1.625"
      />
    </svg>
  ),
};
