import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $documentgenerator, $fillaccesses, $get, $list, $role, $update } from '../../consts/part-name-methods'

export class BXRestNavvyDocumentGeneratorRole  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет роль и возвращает её данные вместе с правами.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $role, $add], param)
  }

  /**
   * Удаляет роль по идентификатору.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $role, $delete], param)
  }

  /**
   * Полностью перезаписывает привязки роли к кодам доступа.
   */
  fillAccesses(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $role, $fillaccesses], param)
  }

  /**
   * Возвращает роль по идентификатору вместе с правами.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $role, $get], param)
  }

  /**
   * Возвращает список ролей без детального состава прав.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $role, $list], param)
  }

  /**
   * Обновляет роль и возвращает актуальные данные.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$documentgenerator, $role, $update], param)
  }
}

