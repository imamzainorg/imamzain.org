export const PlayButtonIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	fill = "#000000",
	...props
}) => (
	<svg
		width={width}
		height={height}
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		{...props}
	>
		<path
			d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
			fill={fill}
		/>
	</svg>
)

export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
	const {
		className = "",
		width = 24,
		stroke = "#000000",
		height = 24,
		fill = "#000000",
	} = props

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className={className}
			width={width}
			height={height}
			fill={fill}
		>
			<path
				stroke={stroke}
				fill={fill}
				d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"
			/>
		</svg>
	)
}

export const VideoRecordingIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	stroke = "#000000",
	fill = "#000000",
	strokeWidth = 1,
	...props
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill="none"
		className={className}
		{...props}
	>
		<path
			d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
			stroke={stroke}
			fill={fill}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export const ChevronRightArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	stroke = "#000000",
	fill = "#000000",
	strokeWidth = 1,
	...props
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill="none"
		className={className}
		{...props}
	>
		<path
			d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
		/>
	</svg>
)

export const TimeIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	stroke = "#000000",
	fill = "none",
	strokeWidth = 1,
	...props
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill={fill}
		className={className}
		{...props}
	>
		<path
			d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
			stroke={stroke}
			fill={fill}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12 6V12"
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16.24 16.24L12 12"
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	stroke = "#000000",
	fill = "none",
	strokeWidth = 1,
	...props
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 512 512"
		fill={fill}
		className={className}
		{...props}
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke={stroke}
			fill={fill}
			strokeWidth={strokeWidth}
			d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379 c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302 c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263 l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z"
		/>
	</svg>
)

export const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	stroke = "#000000",
	fill = "none",
	strokeWidth = 1,
	...props
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill={fill}
		className={className}
		{...props}
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke={stroke}
			fill={fill}
			strokeWidth={strokeWidth}
			d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
		/>
	</svg>
)

export const MessageIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	fill = "#FFF",
	stroke = "#bb9661",
	strokeWidth = 1,
	...props
}) => (
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		fill={fill}
		className={className}
		width={width}
		height={height}
		{...props}
	>
		<path
			d="M7.5 10.5H7.51M12 10.5H12.01M16.5 10.5H16.51M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2ZM8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5C7 10.2239 7.22386 10 7.5 10C7.77614 10 8 10.2239 8 10.5ZM12.5 10.5C12.5 10.7761 12.2761 11 12 11C11.7239 11 11.5 10.7761 11.5 10.5C11.5 10.2239 11.7239 10 12 10C12.2761 10 12.5 10.2239 12.5 10.5ZM17 10.5C17 10.7761 16.7761 11 16.5 11C16.2239 11 16 10.7761 16 10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5Z"
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export const PersonIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	stroke = "#000000",
	fill = "#0f0f0f",
	strokeWidth = 1,
	...props
}) => (
	<svg
		width={width}
		height={height}
		fill={fill}
		className={className}
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 15 15"
	>
		<rect x="0" fill="none" width="24" height="24" />
		<path
			stroke={stroke}
			strokeWidth={strokeWidth}
			fillRule="evenodd"
			clipRule="evenodd"
			fill={fill}
			d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
		/>
	</svg>
)

export const MobileIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	stroke = "#000000",
	fill = "#0f0f0f",
	strokeWidth = 1,
	...props
}) => (
	<svg
		width={width}
		height={height}
		fill={fill}
		className={className}
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<rect x="0" fill="none" width="24" height="24" />
		<path
			stroke={stroke}
			strokeWidth={strokeWidth}
			fillRule="evenodd"
			clipRule="evenodd"
			fill={fill}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M11 18H13M9.2 21H14.8C15.9201 21 16.4802 21 16.908 20.782C17.2843 20.5903 17.5903 20.2843 17.782 19.908C18 19.4802 18 18.9201 18 17.8V6.2C18 5.0799 18 4.51984 17.782 4.09202C17.5903 3.71569 17.2843 3.40973 16.908 3.21799C16.4802 3 15.9201 3 14.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V17.8C6 18.9201 6 19.4802 6.21799 19.908C6.40973 20.2843 6.71569 20.5903 7.09202 20.782C7.51984 21 8.07989 21 9.2 21Z"
		/>
	</svg>
)

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	width = 24,
	height = 24,
	className = "",
	fill = "#25ad54",
	strokeWidth = 1,
	...props
}) => (
	<svg
		width={width}
		height={height}
		fill={fill}
		className={className}
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<path
			opacity="0.5"
			fillRule="evenodd"
			clipRule="evenodd"
			strokeWidth={strokeWidth}
			d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z"
			fill={fill}
		></path>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			strokeWidth={strokeWidth}
			d="M12 16.75C12.2106 16.75 12.4114 16.6615 12.5535 16.5061L16.5535 12.1311C16.833 11.8254 16.8118 11.351 16.5061 11.0715C16.2004 10.792 15.726 10.8132 15.4465 11.1189L12.75 14.0682V3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V14.0682L8.55353 11.1189C8.27403 10.8132 7.79963 10.792 7.49393 11.0715C7.18823 11.351 7.16698 11.8254 7.44648 12.1311L11.4465 16.5061C11.5886 16.6615 11.7894 16.75 12 16.75Z"
			fill={fill}
		></path>
	</svg>
)
