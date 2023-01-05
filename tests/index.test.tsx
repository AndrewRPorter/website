import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/pages/index'

// Mock data here is an example render of the home page
const MOCK_MSX_RESULT = {
  compiledSource:
    'var u=Object.defineProperty,d=Object.defineProperties;var g=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var a=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var h=(e,o,t)=>o in e?u(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,i=(e,o)=>{for(var t in o||(o={}))a.call(o,t)&&h(e,t,o[t]);if(r)for(var t of r(o))p.call(o,t)&&h(e,t,o[t]);return e},m=(e,o)=>d(e,g(o));var s=(e,o)=>{var t={};for(var n in e)a.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&r)for(var n of r(e))o.indexOf(n)<0&&p.call(e,n)&&(t[n]=e[n]);return t};const layoutProps={},MDXLayout="wrapper";function MDXContent(t){var n=t,{components:e}=n,o=s(n,["components"]);return mdx(MDXLayout,m(i(i({},layoutProps),o),{components:e,mdxType:"MDXLayout"}),mdx("h1",null,"Hi, my name is Andrew Porter"),mdx("p",null,"I am a remote Software Engineer at GitHub on the billing team. I enjoy writing web applications with Python and Next.js. Forever learning how to write good code..."),mdx("p",null,"When I\'m not writing code, you can find me in the gym, snowboarding, or picking up random hobbies for short periods of time."),mdx("p",null,"I also have a ",mdx("a",i({parentName:"p"},{href:"/blog"}),"blog")," where I talk about tech stuff."),mdx("img",{src:"/me_rounded.webp",alt:"Picture of me",width:"186",height:"202"}))}MDXContent.isMDXComponent=!0;\n'
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
