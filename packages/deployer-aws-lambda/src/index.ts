import { FabDeployer, FabPackager } from '@fab/core'

export const deploy: FabDeployer = async (fab_path: string, package_path: string) => {
  throw new Error('Not implemented! Use `fab package` and deploy manually.')
}

export const createPackage: FabPackager = async (
  fab_path: string,
  package_path: string
) => {
  console.log('AWS LAMBDA PACKAGER!')
}
