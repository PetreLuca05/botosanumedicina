
import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Arm(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/botosanumedicina/models/arm.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig1LeftShoulder} />
          <skinnedMesh name="Ch36" geometry={nodes.Ch36.geometry} material={materials.Material} skeleton={nodes.Ch36.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/botosanumedicina/models/arm.glb')

export default Arm
