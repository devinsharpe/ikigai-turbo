interface AppIconProps {
  className?: string;
}

export default function AppIcon({ className }: AppIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_107_4)">
        <path
          d="M17.733 4.06983C19.038 5.24679 19.5296 7.08079 18.9882 8.75271L17.8812 12.1712C17.2229 14.2041 16.7297 14.3648 14.9997 13.1106L12.1001 11.0082C10.6792 9.97798 9.99512 8.20962 10.3529 6.49132L11.2791 2.04358C11.7741 -0.333627 12.5641 -0.591785 14.3673 1.03446L17.733 4.06983ZM30.7844 8.36044C31.7738 6.14296 31.2842 5.47142 28.8703 5.73525L24.3541 6.22885C22.6093 6.41955 21.1389 7.61654 20.5981 9.28636L19.4948 12.6937C18.8365 14.7266 19.1417 15.1441 21.2786 15.1421H24.8718C26.6292 15.1403 28.2215 14.1043 28.9376 12.4994L30.7844 8.36044ZM28.8901 26.2379C31.3048 26.4936 31.7922 25.8205 30.7954 23.6063L28.9303 19.4636C28.2098 17.8632 26.617 16.8346 24.8618 16.8364L21.2802 16.8399C19.1434 16.842 18.8389 17.2619 19.5013 19.2935L20.615 22.7098C21.1597 24.3807 22.6355 25.5754 24.3831 25.7605L28.8901 26.2379ZM11.3023 29.9607C11.8052 32.3363 12.5961 32.5918 14.3938 30.9596L17.7574 27.9056C19.0569 26.7258 19.5429 24.8931 18.9988 23.2244L17.8887 19.8192C17.2264 17.7876 16.733 17.6278 15.0055 18.8855L12.1005 21.0005C10.6798 22.0348 9.9995 23.8075 10.3635 25.5268L11.3023 29.9607ZM2.32667 14.3842C0.222844 15.5966 0.224237 16.4277 2.3321 17.6331L6.27597 19.8883C7.7996 20.7596 9.69278 20.6555 11.1117 19.6224L14.0072 17.5144C15.7347 16.2567 15.7342 15.738 14.0042 14.4837L11.0951 12.3745C9.67234 11.3429 7.77617 11.2437 6.25353 12.1212L2.32667 14.3842Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_107_4">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
