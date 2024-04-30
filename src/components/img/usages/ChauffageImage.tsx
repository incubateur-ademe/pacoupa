import { colors } from "@/colors";

import { type UsageImageProps } from "./type";

// Follow rules for optimal accessibility from https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/.
export function ChauffageImage({ alt, enabled }: UsageImageProps) {
  return (
    <svg role="img" width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>{alt}</title>
      <path
        d="M14.5001 29.5417C14.3334 29.6806 14.1601 29.7917 13.9801 29.875C13.8001 29.9584 13.5984 30 13.3751 30C13.1518 30 12.9295 29.9511 12.7084 29.8534C12.4873 29.7556 12.2929 29.6239 12.1251 29.4584C10.9862 28.2361 10.1456 26.9861 9.60342 25.7084C9.0612 24.4306 8.7912 23.0834 8.79342 21.6667C8.79342 20.6389 8.9462 19.5556 9.25175 18.4167C9.55731 17.2778 10.0851 15.8056 10.8351 14C11.474 12.4167 11.9184 11.2017 12.1684 10.355C12.4184 9.50835 12.5434 8.72335 12.5434 8.00002C12.5434 7.05557 12.3351 6.17391 11.9184 5.35502C11.5018 4.53613 10.849 3.70946 9.96008 2.87502C9.79342 2.70835 9.66175 2.51391 9.56508 2.29169C9.46842 2.06946 9.41953 1.84724 9.41842 1.62502C9.41731 1.4028 9.45897 1.20169 9.54342 1.02169C9.62786 0.841685 9.73897 0.667796 9.87675 0.500019C10.0434 0.333352 10.2306 0.208352 10.4384 0.125019C10.6462 0.0416855 10.8612 1.87267e-05 11.0834 1.87267e-05C11.3056 1.87267e-05 11.514 0.0416855 11.7084 0.125019C11.9029 0.208352 12.0834 0.319463 12.2501 0.458352C13.4723 1.59724 14.3818 2.79169 14.9784 4.04169C15.5751 5.29169 15.874 6.61113 15.8751 8.00002C15.8751 8.97224 15.729 9.99335 15.4368 11.0634C15.1445 12.1334 14.6379 13.5289 13.9168 15.25C13.2223 16.9167 12.7501 18.1945 12.5001 19.0834C12.2501 19.9722 12.1251 20.8195 12.1251 21.625C12.1251 22.5972 12.3268 23.535 12.7301 24.4384C13.1334 25.3417 13.7512 26.2511 14.5834 27.1667C14.7223 27.3334 14.8334 27.5139 14.9168 27.7084C15.0001 27.9028 15.0418 28.1111 15.0418 28.3334C15.0418 28.5556 15.0001 28.7711 14.9168 28.98C14.8334 29.1889 14.6945 29.3761 14.5001 29.5417ZM22.6251 29.5417C22.4584 29.6806 22.2851 29.7917 22.1051 29.875C21.9251 29.9584 21.7234 30 21.5001 30C21.2768 30 21.0545 29.9511 20.8334 29.8534C20.6123 29.7556 20.4179 29.6239 20.2501 29.4584C19.1112 28.2361 18.2706 26.9928 17.7284 25.7284C17.1862 24.4639 16.9156 23.1239 16.9167 21.7084C16.9167 20.6806 17.0695 19.5834 17.3751 18.4167C17.6806 17.25 18.2084 15.7778 18.9584 14C19.5973 12.4167 20.0417 11.2084 20.2917 10.375C20.5417 9.54169 20.6667 8.76391 20.6667 8.04169C20.6667 7.09724 20.4584 6.20168 20.0417 5.35502C19.6251 4.50835 18.9723 3.68169 18.0834 2.87502C17.9167 2.70835 17.7918 2.52113 17.7084 2.31335C17.6251 2.10557 17.5834 1.89002 17.5834 1.66669C17.5834 1.44335 17.6184 1.24169 17.6884 1.06169C17.7584 0.881686 17.8623 0.708352 18.0001 0.541685C18.1667 0.375019 18.3612 0.242796 18.5834 0.145019C18.8056 0.0472408 19.0279 -0.00109238 19.2501 1.87267e-05C19.4723 0.00112984 19.674 0.0427966 19.8551 0.125019C20.0362 0.207241 20.2095 0.318352 20.3751 0.458352C21.5973 1.59724 22.5073 2.79169 23.1051 4.04169C23.7029 5.29169 24.0012 6.61113 24.0001 8.00002C24.0001 8.97224 23.8545 9.99335 23.5634 11.0634C23.2723 12.1334 22.7651 13.5428 22.0418 15.2917C21.3473 16.9584 20.8751 18.2361 20.6251 19.125C20.3751 20.0139 20.2501 20.8472 20.2501 21.625C20.2501 22.5972 20.4584 23.5489 20.8751 24.48C21.2917 25.4111 21.9167 26.3206 22.7501 27.2084C22.889 27.375 22.9929 27.5556 23.0618 27.75C23.1306 27.9445 23.1656 28.1389 23.1667 28.3334C23.1667 28.5556 23.1251 28.7778 23.0417 29C22.9584 29.2222 22.8195 29.4028 22.6251 29.5417ZM6.37509 29.5417C6.20842 29.6806 6.03453 29.7917 5.85342 29.875C5.67231 29.9584 5.4712 30 5.25008 30C5.02897 30 4.80675 29.9511 4.58342 29.8534C4.36008 29.7556 4.16564 29.6239 4.00008 29.4584C2.8612 28.2361 2.02064 26.9928 1.47842 25.7284C0.936196 24.4639 0.66564 23.1239 0.666751 21.7084C0.666751 20.6806 0.819529 19.5834 1.12508 18.4167C1.43064 17.25 1.95842 15.7778 2.70842 14C3.34731 12.4167 3.79175 11.2084 4.04175 10.375C4.29175 9.54169 4.41675 8.76391 4.41675 8.04169C4.41675 7.09724 4.20842 6.20168 3.79175 5.35502C3.37508 4.50835 2.72231 3.68169 1.83342 2.87502C1.63897 2.70835 1.50008 2.52113 1.41675 2.31335C1.33342 2.10557 1.29175 1.89002 1.29175 1.66669C1.29175 1.44335 1.33342 1.23502 1.41675 1.04169C1.50008 0.848352 1.6112 0.667796 1.75008 0.500019C1.91675 0.333352 2.10453 0.208352 2.31342 0.125019C2.52231 0.0416855 2.73731 1.87267e-05 2.95842 1.87267e-05C3.17953 1.87267e-05 3.38786 0.0416855 3.58342 0.125019C3.77897 0.208352 3.95953 0.319463 4.12508 0.458352C5.34731 1.59724 6.25731 2.78502 6.85509 4.02169C7.45286 5.25835 7.7512 6.58446 7.75008 8.00002C7.75008 8.97224 7.6112 9.99335 7.33342 11.0634C7.05564 12.1334 6.55564 13.5289 5.83342 15.25C5.13897 16.9167 4.66675 18.1945 4.41675 19.0834C4.16675 19.9722 4.04175 20.8195 4.04175 21.625C4.04175 22.5972 4.24342 23.5489 4.64675 24.48C5.05009 25.4111 5.66786 26.3206 6.50008 27.2084C6.63897 27.375 6.74342 27.5556 6.81342 27.75C6.88342 27.9445 6.91786 28.1389 6.91675 28.3334C6.91675 28.5556 6.87509 28.7778 6.79175 29C6.70842 29.2222 6.56953 29.4028 6.37509 29.5417Z"
        fill={enabled || enabled === undefined ? colors.evaluationEnabled : colors.evaluationDisabled}
      />
    </svg>
  );
}
