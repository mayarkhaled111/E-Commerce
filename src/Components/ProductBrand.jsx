import React, { useEffect, useState } from 'react'
import Item from './Item'
import { useParams } from 'react-router-dom'
import { getRelatedBrand } from '../APIS/allProducts'
import Loading from './Loading'
import { useQuery } from '@tanstack/react-query'

export default function ProductBrand() {
    let [relatedBrand, setRelatedBrand] = useState([])
    let [msg, setMsg] = useState('')
    let [loading, setLoading] = useState(false)
    let { id } = useParams()

    async function AllRelatedBrand() {
        setLoading(true)
        let data = await getRelatedBrand(id)
        if (data?.data) {
            setRelatedBrand(data?.data)
            setLoading(false)
            setMsg('')
        } else {
            setMsg(data)
            setLoading(false)
        }
    }

    useEffect(() => {
        AllRelatedBrand()
    }, [])

    console.log(relatedBrand);
    return (
        <div className='py-11'>
            {relatedBrand.length ? <div className='flex flex-wrap container'>
                {relatedBrand.map(prod => <Item key={prod._id} ele={prod}></Item>)}
            </div> : loading ? <Loading></Loading> : <h1 className='text-green-700 flex justify-center items-center text-6xl'>No Product</h1>}
        </div>
    )
}
