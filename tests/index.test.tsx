import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/pages/index'

// Mock data here is an example render of the home page
const MOCK_MSX_RESULT = {
  compiledSource:
    'var u=Object.defineProperty,d=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var i=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var l=(e,t,o)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,r=(e,t)=>{for(var o in t||(t={}))i.call(t,o)&&l(e,o,t[o]);if(a)for(var o of a(t))p.call(t,o)&&l(e,o,t[o]);return e},s=(e,t)=>d(e,h(t));var m=(e,t)=>{var o={};for(var n in e)i.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&a)for(var n of a(e))t.indexOf(n)<0&&p.call(e,n)&&(o[n]=e[n]);return o};const layoutProps={},MDXLayout="wrapper";function MDXContent(o){var n=o,{components:e}=n,t=m(n,["components"]);return mdx(MDXLayout,s(r(r({},layoutProps),t),{components:e,mdxType:"MDXLayout"}),mdx("h1",null,"Hi, my name is Andrew Porter"),mdx("p",null,"I am a remote Software Engineer at GitHub on the billing team. I enjoy writing web applications with Python and Next.js. I consider myself a lifetime learner and am currently diving into the world of Ruby."),mdx("p",null,"Besides writing code, I like to workout, snowboard, golf, and cook."),mdx("p",null,"I also have a ",mdx("a",r({parentName:"p"},{href:"/blog"}),"blog")," where I talk about tech stuff."),mdx("img",{src:"/me_rounded.webp",alt:"Picture of me",width:"186px",height:"202px"}))}MDXContent.isMDXComponent=!0;\n'
}

describe('Home', () => {
  it('renders name heading', async () => {
    render(<Home mdxResult={MOCK_MSX_RESULT} />)

    const heading = screen.getByRole('heading', {
      name: /Hi, my name is Andrew Porter/i
    })

    expect(heading).toBeInTheDocument()
  })
})
