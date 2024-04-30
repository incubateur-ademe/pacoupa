import { colors } from "@/colors";

import { type UsageImageProps } from "./type";

export function EcsImage({ alt, enabled }: UsageImageProps) {
  return (
    <>
      <svg width="21" height="38" viewBox="0 0 21 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{alt}</title>

        <path
          d="M10.8333 37.3334C8.18109 37.3334 5.63755 36.2798 3.76218 34.4044C1.88682 32.5291 0.833252 29.9855 0.833252 27.3334C0.833252 20.6667 10.8333 9.41669 10.8333 9.41669C10.8333 9.41669 20.8333 20.6667 20.8333 27.3334C20.8333 29.9855 19.7797 32.5291 17.9043 34.4044C16.029 36.2798 13.4854 37.3334 10.8333 37.3334Z"
          fill={enabled || enabled === undefined ? colors.evaluationEnabled : colors.evaluationDisabled}
        />
        <path
          d="M13.9882 10.776C13.7023 10.6144 13.5633 10.2768 13.6487 9.95956C13.8354 9.26611 14.1086 8.24875 14.3542 7.66669C14.6736 6.87503 14.8958 6.27086 15.0208 5.85419C15.1458 5.43753 15.2083 5.04864 15.2083 4.68753C15.2083 4.2153 15.1042 3.76753 14.8958 3.34419C14.6875 2.92086 14.3611 2.50753 13.9167 2.1042C13.8333 2.02086 13.7708 1.92725 13.7292 1.82336C13.6875 1.71947 13.6667 1.6117 13.6667 1.50003C13.6667 1.38836 13.6842 1.28753 13.7192 1.19753C13.7542 1.10753 13.8061 1.02086 13.875 0.93753C13.9583 0.854196 14.0556 0.788085 14.1667 0.739196C14.2778 0.690307 14.3889 0.666141 14.5 0.666696C14.6111 0.667252 14.7119 0.688085 14.8025 0.729196C14.8931 0.770307 14.9797 0.825863 15.0625 0.895863C15.6736 1.46531 16.1286 2.06253 16.4275 2.68753C16.7264 3.31253 16.8756 3.97225 16.875 4.66669C16.875 5.1528 16.8022 5.66336 16.6567 6.19836C16.5111 6.73336 16.2575 7.43808 15.8958 8.31253C15.5486 9.14586 15.3125 9.78475 15.1875 10.2292C15.0471 10.7282 14.4628 11.0444 14.0116 10.7892L13.9882 10.776Z"
          fill={enabled || enabled === undefined ? colors.evaluationEnabled : colors.evaluationDisabled}
        />
        <path
          d="M12.2036 6.76264C12.0459 7.22149 11.5259 7.43825 11.0839 7.23805C10.6858 7.0577 10.4955 6.60141 10.6378 6.18816C10.685 6.05116 10.7268 5.92557 10.7508 5.84418C10.8758 5.42085 10.9383 5.02835 10.9383 4.66668C10.9383 4.19446 10.8342 3.75363 10.6258 3.34419C10.4175 2.93474 10.0911 2.52141 9.64667 2.10419C9.56334 2.02085 9.4975 1.92363 9.44917 1.81252C9.40084 1.70141 9.37639 1.5903 9.37584 1.47919C9.37528 1.36808 9.39611 1.26752 9.43834 1.17752C9.48056 1.08752 9.53611 1.00058 9.605 0.916687C9.68834 0.833354 9.78195 0.770854 9.88584 0.729187C9.98972 0.68752 10.0972 0.666687 10.2083 0.666687C10.3194 0.666687 10.4236 0.68752 10.5208 0.729187C10.6181 0.770854 10.7083 0.826409 10.7917 0.895854C11.4028 1.4653 11.8575 2.06252 12.1558 2.68752C12.4542 3.31252 12.6036 3.97224 12.6042 4.66668C12.6042 5.1528 12.5311 5.66335 12.385 6.19835C12.3484 6.33246 12.2788 6.5439 12.2036 6.76264Z"
          fill={enabled || enabled === undefined ? colors.evaluationEnabled : colors.evaluationDisabled}
        />
        <path
          d="M6.53925 11.6846C6.50533 11.8861 6.41871 12.0796 6.27271 12.2225C5.83067 12.6551 5.08223 12.444 5.01829 11.8287C5.00675 11.7177 4.99993 11.613 5 11.5208C5 11.007 5.07639 10.4583 5.22917 9.87501C5.38195 9.29168 5.64584 8.55557 6.02084 7.66668C6.34028 6.87502 6.5625 6.27085 6.6875 5.85418C6.8125 5.43752 6.875 5.04863 6.875 4.68752C6.875 4.2153 6.77084 3.76752 6.5625 3.34419C6.35417 2.92085 6.02778 2.50752 5.58334 2.10419C5.48611 2.02085 5.41667 1.92724 5.375 1.82335C5.33334 1.71946 5.3125 1.61169 5.3125 1.50002C5.3125 1.38835 5.33334 1.28419 5.375 1.18752C5.41667 1.09085 5.47223 1.00058 5.54167 0.916687C5.625 0.833354 5.71889 0.770854 5.82334 0.729187C5.92778 0.68752 6.03528 0.666687 6.14584 0.666687C6.25639 0.666687 6.36056 0.68752 6.45834 0.729187C6.55611 0.770854 6.64639 0.826409 6.72917 0.895854C7.34028 1.4653 7.79528 2.05919 8.09417 2.67752C8.39306 3.29585 8.54222 3.95891 8.54167 4.66668C8.54167 5.1528 8.47222 5.66335 8.33334 6.19835C8.19445 6.73335 7.94445 7.43113 7.58334 8.29168C7.23611 9.12501 7 9.7639 6.875 10.2083C6.79036 10.5093 6.6174 11.2204 6.53925 11.6846Z"
          fill={enabled || enabled === undefined ? colors.evaluationEnabled : colors.evaluationDisabled}
        />
      </svg>
    </>
  );
}
