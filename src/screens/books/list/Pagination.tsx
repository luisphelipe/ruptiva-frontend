import React from 'react'
import { Link as DefaultLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 430px;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`

const link_mixin = css``

const selected_link = css`
  cursor: default;
  pointer-events: none;
  text-decoration: none;
  color: inherit;
`

const Link = styled(DefaultLink)<{ disabled?: boolean }>`
  ${link_mixin};
  ${(props) => (props.disabled ? `${selected_link}` : ``)};
`

const FakeLink = styled.span`
  ${link_mixin};
`

const new_link = (
  url: string,
  page: number,
  limit: number,
  number: number
) => ({
  url: `${url}?page=${page}&limit=${limit}`,
  number,
  page
})

// This is kinda ugly
const Pagination = ({ url, page = 1, limit = 6, count = 1 }: any) => {
  let links: any = []

  if (page - 1 > 1) links.push(new_link(url, 1, limit, 1))
  if (page - 1 > 2) links.push('...')

  const last_page = Math.ceil(count / limit)
  // Add links for previous and next pages
  for (let i = Math.max(page - 1, 1); i <= Math.min(last_page, page + 1); i++) {
    links.push(new_link(url, i, limit, i))
  }

  if (page + 1 < last_page - 1) links.push('...')
  if (page + 1 < last_page)
    links.push(new_link(url, last_page, limit, last_page))

  return (
    <FlexWrapper style={{ justifyContent: 'space-around' }}>
      {links.map((link: any, index: any) =>
        typeof link == 'string' ? (
          <FakeLink key={index}>{link}</FakeLink>
        ) : (
          <Link key={link.number} to={link.url} disabled={link.page === page}>
            {link.number}
          </Link>
        )
      )}
    </FlexWrapper>
  )
}

export default Pagination
