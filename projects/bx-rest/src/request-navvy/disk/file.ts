import { $copyto, $delete, $disk, $file, $get, $getExternalLink, $getFields, $getVersions, $markdeleted, $moveto, $rename, $restore, $restoreFromVersion, $search, $uploadversion } from '../../consts/part-name-methods'
import { BXRestMapDiskFile } from '../../map/disk/file'
import { Navvy } from '../../services/navvy'
import {
  iBXRestDiskFileHttp,
  iBXRestDiskFileSearchResult,
  iBXRestDiskVersion,
  iBXRestParamDiskFileGet,
  iBXRestParamDiskFileGetVersions,
  iBXRestParamDiskFileMarkDeleted,
  iBXRestParamDiskFileRename,
  iBXRestParamDiskFileRestoreFromVersion,
  iBXRestParamDiskFileSearch,
  iBXRestParamDiskFileTarget,
  iBXRestParamDiskFileUploadVersion
} from '../../typification/rest/disk'

export class BXRestNavvyDiskFile {
  private readonly Navvy = new Navvy()
  private readonly url = {
    getFields: [$disk, $file, $getFields],
    get: [$disk, $file, $get],
    rename: [$disk, $file, $rename],
    copyTo: [$disk, $file, $copyto],
    moveTo: [$disk, $file, $moveto],
    delete: [$disk, $file, $delete],
    markDeleted: [$disk, $file, $markdeleted],
    restore: [$disk, $file, $restore],
    uploadVersion: [$disk, $file, $uploadversion],
    getVersions: [$disk, $file, $getVersions],
    restoreFromVersion: [$disk, $file, $restoreFromVersion],
    getExternalLink: [$disk, $file, $getExternalLink],
    search: [$disk, $file, $search]
  }

  get(param: iBXRestParamDiskFileGet) {
    return this.Navvy.simple(this.url.get, param, BXRestMapDiskFile.get)
  }

  getFields() {
    return this.Navvy.simple<Record<string, unknown>>(this.url.getFields)
  }

  rename(param: iBXRestParamDiskFileRename) {
    return this.Navvy.simple<iBXRestDiskFileHttp, iBXRestDiskFileHttp, iBXRestParamDiskFileRename>(
      this.url.rename,
      param
    )
  }

  copyTo(param: iBXRestParamDiskFileTarget) {
    return this.Navvy.simple<iBXRestDiskFileHttp, iBXRestDiskFileHttp, iBXRestParamDiskFileTarget>(
      this.url.copyTo,
      param
    )
  }

  moveTo(param: iBXRestParamDiskFileTarget) {
    return this.Navvy.simple<iBXRestDiskFileHttp, iBXRestDiskFileHttp, iBXRestParamDiskFileTarget>(
      this.url.moveTo,
      param
    )
  }

  delete(param: iBXRestParamDiskFileGet) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamDiskFileGet>(
      this.url.delete,
      param
    )
  }

  markDeleted(param: iBXRestParamDiskFileMarkDeleted) {
    return this.Navvy.simple(
      this.url.markDeleted,
      param,
      BXRestMapDiskFile.get
    )
  }

  restore(param: iBXRestParamDiskFileGet) {
    return this.Navvy.simple<iBXRestDiskFileHttp, iBXRestDiskFileHttp, iBXRestParamDiskFileGet>(
      this.url.restore,
      param
    )
  }

  uploadVersion(param: iBXRestParamDiskFileUploadVersion) {
    return this.Navvy.simple<iBXRestDiskFileHttp, iBXRestDiskFileHttp, iBXRestParamDiskFileUploadVersion>(
      this.url.uploadVersion,
      param
    )
  }

  getVersions(param: iBXRestParamDiskFileGetVersions) {
    return this.Navvy.pagNav<
      iBXRestDiskVersion,
      iBXRestDiskVersion,
      iBXRestParamDiskFileGetVersions
    >(this.url.getVersions, param)
  }

  restoreFromVersion(param: iBXRestParamDiskFileRestoreFromVersion) {
    return this.Navvy.simple<iBXRestDiskFileHttp, iBXRestDiskFileHttp, iBXRestParamDiskFileRestoreFromVersion>(
      this.url.restoreFromVersion,
      param
    )
  }

  getExternalLink(param: iBXRestParamDiskFileGet) {
    return this.Navvy.simple<string, string, iBXRestParamDiskFileGet>(
      this.url.getExternalLink,
      param
    )
  }

  search(param: iBXRestParamDiskFileSearch) {
    return this.Navvy.pagNav<
      iBXRestDiskFileSearchResult,
      iBXRestDiskFileSearchResult,
      iBXRestParamDiskFileSearch
    >(this.url.search, param)
  }
}
