export interface HeroBanner {
    id: number
    title: string
    subtitle?: string
    description?: string
    button_text?: string
    button_link?: string
    button_style: 'primary' | 'secondary' | 'outline'
    text_color: string
    overlay_color: string
    overlay_opacity: number
    text_position: 'left' | 'center' | 'right'
    image: {
        desktop: string
        mobile: string
        thumb: string
    }
}

// export interface Category{
//     label: string,
//     icon: string,
//     to: string,
//     description: string,
//     children: Array<Category>
// }