import React from 'react'

export interface SelectListProps{
    selects: {
        hour: {
            ref: React.RefObject<HTMLSelectElement>
            opts: number[]
        }
        minute: {
            ref: React.RefObject<HTMLSelectElement>
            opts: number[]
        }
        second: {
            ref: React.RefObject<HTMLSelectElement>
            opts: number[]
        }
        
    }
    idxs: {
        hour: number
        minute: number
        second: number
    }
}

export interface SelectProps{
    select: {
        ref: React.RefObject<HTMLSelectElement>
        opts: number[]
    }
    idx: number
}

export interface TTSProps {
    idxs: {
        hour: number
        minute: number
        second: number
    }
    isRunning: boolean
}