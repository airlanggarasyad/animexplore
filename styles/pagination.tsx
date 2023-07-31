/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const paginationStyles = css`
  display: flex;
  justify-content: center;

  ul {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      margin-right: 0.3em;
    }

    li:hover {
      color: red;
      cursor: pointer;
    }

    li.active {
      color: red;
    }
  }
`;

export default paginationStyles;